import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

export async function generateOutfits(imagePath: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const image = {
    inlineData: {
      data: fs.readFileSync(imagePath).toString("base64"),
      mimeType: "image/jpeg",
    },
  };

  const prompt = `
You are an expert fashion stylist.

Analyze the uploaded clothing image.

Generate ONLY valid JSON.

{
 "uploadedItem":"",
 "outfits":[
   {
     "title":"",
     "occasion":"",
     "description":"",
     "top":"",
     "bottom":"",
     "footwear":"",
     "accessories":[],
     "colors":[],
     "styleScore":95,
     "tips":""
   }
 ]
}
`;

  const result = await model.generateContent([
    prompt,
    image,
  ]);

  const text = result.response.text();

  return JSON.parse(
    text.replace(/```json/g, "").replace(/```/g, "")
  );
}