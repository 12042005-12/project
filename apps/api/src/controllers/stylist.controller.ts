import { Request, Response } from "express";
import ChatHistory from "../models/ChatHistory";
import { askFashionAI } from "../services/stylist.service";

export const chat = async (
  req: Request,
  res: Response
) => {

    const { question } = req.body;

    const answer =
        await askFashionAI(question);

    await ChatHistory.create({

        question,

        answer

    });

    res.json({

        success:true,

        answer

    });

};