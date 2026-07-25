interface FilterPanelProps {
  title: string;
  options: string[];
}

export function FilterPanel({ title, options }: FilterPanelProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button key={option} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 hover:bg-white/10">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
