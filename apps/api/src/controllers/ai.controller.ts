import { Request, Response } from "express";
import fs from "fs";
import { analyzeFashionImage } from "../services/gemini.service";
import FashionAnalysis from "../models/FashionAnalysis";

export const analyzeImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
      return;
    }

    // Gemini AI analyzes the image
    const result = await analyzeFashionImage(req.file.path);

    // ⭐ Save AI analysis to MongoDB
    await FashionAnalysis.create({
      // Use req.user?._id only if authentication middleware is enabled
      // Otherwise comment it out for now
      // user: req.user?._id,

      imageUrl: req.file.path,

      ...result,
    });

    // Delete temporary uploaded file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "AI analysis failed.",
    });
  }
};
export const getFashionHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const history = await FashionAnalysis.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history.",
    });
  }
};