import { Request, Response } from "express";
import fs from "fs";
import { generateVirtualTryOn } from "../services/tryon.service";

export const virtualTryOn = async (
  req: Request,
  res: Response
) => {
  try {
    const files = req.files as {
      [field: string]: Express.Multer.File[];
    };

    if (
      !files.person ||
      !files.cloth
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Upload person and clothing images.",
      });
    }

    const result = await generateVirtualTryOn(
      files.person[0].path,
      files.cloth[0].path
    );

    fs.unlinkSync(files.person[0].path);
    fs.unlinkSync(files.cloth[0].path);

    res.json(result);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Virtual Try-On Failed",
    });

  }
};