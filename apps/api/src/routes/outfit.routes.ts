import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { generateAIOutfits } from "../controllers/outfit.controller";

const router = Router();

router.post(
  "/generate",
  upload.single("image"),
  generateAIOutfits
);

export default router;