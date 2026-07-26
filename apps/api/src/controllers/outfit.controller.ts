import { Request, Response } from "express";
import fs from "fs";
import { generateOutfits } from "../services/outfit.service";

export const generateAIOutfits = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Upload an image.",
      });
    }

    const outfits = await generateOutfits(
      req.file.path
    );

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.json({
      success: true,
      data: outfits,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed",
    });

  }
};