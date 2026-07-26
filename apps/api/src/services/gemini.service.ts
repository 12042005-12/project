import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function analyzeFashionImage(imagePath: string) {
    try {
        const imageBytes = fs.readFileSync(imagePath);

        const imagePart = {
            inlineData: {
                data: imageBytes.toString("base64"),
                mimeType: "image/jpeg",
            },
        };

        const prompt = `
You are an expert AI Fashion Stylist.

Analyze the uploaded clothing or fabric image.

Return ONLY valid JSON.

{
  "clothingType":"",
  "fabric":"",
  "primaryColor":"",
  "secondaryColor":"",
  "pattern":"",
  "style":"",
  "season":"",
  "occasion":"",
  "bodyTypes":[],
  "matchingBottoms":[],
  "matchingFootwear":[],
  "matchingAccessories":[],
  "fashionTips":[],
  "careInstructions":[],
  "confidence":0
}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: prompt,
                        },
                        imagePart,
                    ],
                },
            ],
        });

        let text = response.text ?? "";

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(text);

    } catch (err) {
        console.error(err);

        return {
            success: false,
            message: "Gemini analysis failed",
        };
    }
}