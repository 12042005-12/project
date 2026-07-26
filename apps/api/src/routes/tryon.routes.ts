import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { virtualTryOn } from "../controllers/tryon.controller";

const router = Router();

router.post(
  "/",
  upload.fields([
    {
      name: "person",
      maxCount: 1,
    },
    {
      name: "cloth",
      maxCount: 1,
    },
  ]),
  virtualTryOn
);

export default router;