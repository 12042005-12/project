import { Router } from "express";
import { analyzeImage } from "../controllers/ai.controller";
import { upload } from "../middleware/upload.middleware";
// import { authenticate } from "../middleware/auth.middleware";
import {
  analyzeImage,
  getFashionHistory,
} from "../controllers/ai.controller";
const router = Router();

/**
 * Analyze Clothing/Fabric Image
 *
 * POST /api/ai/analyze-image
 */
router.post(
  "/analyze-image",
  // authenticate, // Uncomment if login is required
  upload.single("image"),
  analyzeImage
);
router.get(
  "/history",
  getFashionHistory
);

export default router;