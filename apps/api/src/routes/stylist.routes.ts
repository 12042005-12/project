import { Router } from "express";
import { chat } from "../controllers/stylist.controller";

const router = Router();

router.post("/", chat);

export default router;