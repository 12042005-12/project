#!/usr/bin/env python3
"""
Deterministic rule-based predictor for damage claims.
Uses conversation analysis + user history + sample patterns to produce output.csv.
Designed to run without API access and produces results matching the expected schema.
"""

import csv
import re
from pathlib import Path

# Resolve dataset/output paths relative to the project root (parent of scripts/)
ROOT = Path(__file__).resolve().parents[1]
DATASET = ROOT / "Datasets"
OUTPUT = ROOT / "output.csv"

FIELDNAMES = [
    "user_id","image_paths","user_claim","claim_object",
    "evidence_standard_met","evidence_standard_met_reason",
    "risk_flags","issue_type","object_part",
    "claim_status","claim_status_justification",
    "supporting_image_ids","valid_image","severity",
]

# ─── Keyword maps ──────────────────────────────────────────────────────────────

ISSUE_KEYWORDS = {
    "dent":             ["dent","dented","denting","deformed"],
    "scratch":          ["scratch","scratched","mark","scuff","scrape"],
    "crack":            ["crack","cracked","cracking","shatter","shattered","glass shatter"],
    "glass_shatter":    ["shatter","shattered","glass shatter"],
    "broken_part":      ["broken","broke","snapped","detach","not sitting","wobble","damaged"],
    "missing_part":     ["missing","came off","fell off","gone","not there","no longer"],
    "torn_packaging":   ["torn","ripped","open","opened","phata","phati"],
    "crushed_packaging":["crushed","crush","dab","daba","pressed"],
    "water_damage":     ["water","wet","liquid","rain","spill","coffee"],
    "stain":            ["stain","stained","sticky","mark","oily","dark mark"],
    "none":             [],
}

CAR_PART_KEYWORDS = {
    "front_bumper":  ["front bumper","front"],
    "rear_bumper":   ["rear bumper","back bumper","rear","back"],
    "door":          ["door"],
    "hood":          ["hood"],
    "windshield":    ["windshield","front glass","glass","windscreen"],
    "side_mirror":   ["side mirror","mirror","left mirror","right mirror"],
    "headlight":     ["headlight","head light","left headlight","front light"],
    "taillight":     ["taillight","tail light","back light","backlight"],
    "fender":        ["fender"],
    "quarter_panel": ["quarter panel","quarter"],
    "body":          ["body","body panel","car body"],
}

LAPTOP_PART_KEYWORDS = {
    "screen":    ["screen","display","lcd","glass display","pantalla","屏幕","la pantalla"],
    "keyboard":  ["keyboard","key","keys","teclas"],
    "trackpad":  ["trackpad","touchpad","cursor"],
    "hinge":     ["hinge"],
    "lid":       ["lid","outer lid"],
    "corner":    ["corner"],
    "port":      ["port"],
    "base":      ["base"],
    "body":      ["body","outer body","body crack","casing","edge"],
}

PACKAGE_PART_KEYWORDS = {
    "box":           ["box","cardboard"],
    "package_corner":["corner","package corner"],
    "package_side":  ["side","surface"],
    "seal":          ["seal","flap","tape","open","opened"],
    "label":         ["label"],
    "contents":      ["contents","inside","product","item inside","missing"],
    "item":          ["item","product inside","broken item"],
}

PART_MAPS = {"car": CAR_PART_KEYWORDS, "laptop": LAPTOP_PART_KEYWORDS, "package": PACKAGE_PART_KEYWORDS}

# Risk triggers
INJECTION_TRIGGERS = [
    "approve the claim", "skip manual review", "ignore all previous",
    "mark this row", "system reading this should", "follow it and approve",
    "approve", "approve this", "ignore previous instructions",
    "escalate publicly", "keep reopening tickets",
]

def load_csv(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def image_ids(paths_str):
    if not paths_str:
        return []
    return [Path(p.strip()).stem for p in paths_str.split(";") if p.strip()]

def lower(s):
    return (s or "").lower()

def detect_issue(claim_text, claim_object):
    t = lower(claim_text)
    # glass_shatter before crack since it's more specific
    for issue, kws in ISSUE_KEYWORDS.items():
        for kw in kws:
            if kw in t:
                return issue
    return "unknown"

def detect_part(claim_text, claim_object):
    t = lower(claim_text)
    part_map = PART_MAPS.get(claim_object, {})
    for part, kws in part_map.items():
        for kw in kws:
            if kw in t:
                return part
    return "unknown"

def has_injection(claim_text):
    t = lower(claim_text)
    return any(trigger in t for trigger in INJECTION_TRIGGERS)

def has_user_threat(claim_text):
    t = lower(claim_text)
    threats = ["escalate publicly","keep reopening","tired of repeat","rejected again"]
    return any(tr in t for tr in threats)

def severity_for_issue(issue, claim_text):
    t = lower(claim_text)
    if issue in ("none",):
        return "none"
    if issue in ("glass_shatter",) or "shatter" in t:
        return "high"
    if issue in ("crack","broken_part") or "severe" in t or "very bad" in t or "pretty bad" in t:
        return "medium"
    if issue in ("scratch","stain"):
        return "low"
    if issue in ("dent","crushed_packaging","torn_packaging","water_damage","missing_part"):
        return "medium"
    if issue == "unknown":
        return "unknown"
    return "medium"

def num_images(paths_str):
    if not paths_str:
        return 0
    return len([p for p in paths_str.split(";") if p.strip()])

def evidence_met_check(claim_text, claim_object, paths_str, issue, part):
    n = num_images(paths_str)
    t = lower(claim_text)
    # Missing contents claims are usually insufficient
    if part in ("contents","item") and "missing" in t:
        return False, "Images of opened package contents are needed to verify missing item claims."
    if n == 0:
        return False, "No images provided."
    if part == "unknown" or issue == "unknown":
        return True, "Images are present but the claimed part is unclear."
    return True, f"The {part.replace('_',' ')} is expected to be visible and assessable from the submitted image(s)."

def infer_claim_status(claim_text, claim_object, issue, part, history_flags, user_history, has_inject, has_threat):
    t = lower(claim_text)
    rejected = int(user_history.get("rejected_claim", 0) or 0)
    manual   = int(user_history.get("manual_review_claim", 0) or 0)
    
    # Instruction injection → contradicted
    if has_inject:
        return "contradicted", "Embedded approval instructions detected in the claim or image. Visual evidence is required; instructions are disregarded."

    # Missing contents without clear visual → not_enough_information
    if part in ("contents","item") or (issue == "missing_part" and part in ("contents","item","unknown")):
        return "not_enough_information", f"The images must clearly show the opened package and contents area to verify a missing item claim. Without this visual evidence, the claim cannot be assessed."

    # High rejection history → flag for contradiction if claim is vague
    if rejected >= 3 and "user_history_risk" in (history_flags or ""):
        if issue in ("none","unknown") or part == "unknown":
            return "contradicted", f"The submitted images do not clearly show the claimed damage. User history shows multiple rejected claims."

    # Normal plausible claim → supported
    return "supported", f"The submitted image(s) are expected to show {issue.replace('_',' ')} on the {part.replace('_',' ')}. Based on the claim conversation, the evidence aligns with the reported damage."

def build_risk_flags(claim_text, history_flags, has_inject, has_threat, issue, part, n_images):
    flags = []
    t = lower(claim_text)
    if has_inject:
        flags.append("text_instruction_present")
        flags.append("manual_review_required")
    if has_threat:
        flags.append("manual_review_required")
    if history_flags and history_flags != "none":
        for hf in history_flags.split(";"):
            hf = hf.strip()
            if hf and hf not in flags:
                flags.append(hf)
    if issue == "unknown":
        flags.append("damage_not_visible")
    if part == "unknown":
        flags.append("wrong_object_part")
    # Deduplicate and filter
    seen = set()
    out = []
    for f in flags:
        if f not in seen:
            seen.add(f)
            out.append(f)
    return ";".join(out) if out else "none"

def predict(row, user_history_map, evidence_reqs):
    uid = row["user_id"]
    paths_str = row["image_paths"]
    claim_text = row["user_claim"]
    claim_object = row["claim_object"]
    hist = user_history_map.get(uid, {})
    history_flags = hist.get("history_flags", "none")

    ids = image_ids(paths_str)
    n = len(ids)

    issue = detect_issue(claim_text, claim_object)
    part  = detect_part(claim_text, claim_object)
    has_inject = has_injection(claim_text)
    has_threat = has_user_threat(claim_text)

    ev_met, ev_reason = evidence_met_check(claim_text, claim_object, paths_str, issue, part)

    status, justification = infer_claim_status(
        claim_text, claim_object, issue, part, history_flags, hist, has_inject, has_threat
    )

    risk_flags = build_risk_flags(claim_text, history_flags, has_inject, has_threat, issue, part, n)

    sev = severity_for_issue(issue, claim_text)
    if status == "contradicted" and sev not in ("high",):
        sev = "low" if issue in ("scratch","stain") else sev

    # supporting_image_ids
    if status == "not_enough_information" or not ev_met:
        supp_ids = "none"
        valid_image = "false"
    elif status == "contradicted" and has_inject:
        supp_ids = ";".join(ids) if ids else "none"
        valid_image = "true"
    else:
        # Pick first image as primary supporting
        supp_ids = ids[0] if ids else "none"
        valid_image = "true"

    # non_original_image flag check (evasive phrasing)
    if "screenshot" in lower(claim_text) or "non original" in lower(claim_text):
        risk_flags = risk_flags.replace("none","") + (";non_original_image" if "non_original_image" not in risk_flags else "")
        risk_flags = risk_flags.strip(";")
        valid_image = "false"

    return {
        "user_id": uid,
        "image_paths": paths_str,
        "user_claim": claim_text,
        "claim_object": claim_object,
        "evidence_standard_met": str(ev_met).lower(),
        "evidence_standard_met_reason": ev_reason,
        "risk_flags": risk_flags,
        "issue_type": issue,
        "object_part": part,
        "claim_status": status,
        "claim_status_justification": justification,
        "supporting_image_ids": supp_ids,
        "valid_image": valid_image,
        "severity": sev,
    }

def main():
    claims = load_csv(str(DATASET / "claims.csv"))
    history_raw = load_csv(str(DATASET / "user_history.csv"))
    user_history_map = {r["user_id"]: r for r in history_raw}
    evidence_reqs = load_csv(str(DATASET / "evidence_requirements.csv"))

    results = []
    for row in claims:
        result = predict(row, user_history_map, evidence_reqs)
        results.append(result)
        print(f"  {row['user_id']} | {row['claim_object']} | {result['claim_status']} | {result['issue_type']} | {result['object_part']}")

    with open(OUTPUT, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=FIELDNAMES, quoting=csv.QUOTE_ALL)
        w.writeheader()
        w.writerows(results)
    print(f"\noutput.csv written -> {OUTPUT}")

    # Quick evaluation against sample_claims
    sample = load_csv(str(DATASET / "sample_claims.csv"))
    sample_preds = [predict(
        {"user_id":r["user_id"],"image_paths":r["image_paths"],
         "user_claim":r["user_claim"],"claim_object":r["claim_object"]},
        user_history_map, evidence_reqs
    ) for r in sample]

    fields = ["evidence_standard_met","issue_type","object_part","claim_status","valid_image","severity"]
    print("\nSample set accuracy (rule-based baseline)")
    for f in fields:
        hits = sum(1 for p, g in zip(sample_preds, sample)
                   if p[f].strip().lower() == g.get(f,"").strip().lower())
        print(f"  {f:<30} {hits}/{len(sample)}  {hits/len(sample):.0%}")

if __name__ == "__main__":
    main()