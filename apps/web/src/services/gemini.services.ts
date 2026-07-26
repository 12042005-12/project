import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function generateFashionResponse(
  prompt: string
): Promise<string> {
  try {
    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);

    throw new Error("Failed to generate AI response");
  }
}

export async function generateOutfitRecommendation(data: {
  gender: string;
  occasion: string;
  weather: string;
  season: string;
  colorPreference?: string;
}) {
  const prompt = `
You are a professional AI Fashion Stylist.

Suggest an outfit.

Gender: ${data.gender}
Occasion: ${data.occasion}
Weather: ${data.weather}
Season: ${data.season}
Favorite Color: ${data.colorPreference ?? "Any"}

Return the answer in this format:

Top:
Bottom:
Footwear:
Accessories:
Fashion Tips:
`;

  return await generateFashionResponse(prompt);
}

export async function analyzeWardrobe(
  wardrobe: string[]
): Promise<string> {
  const prompt = `
You are an AI Fashion Expert.

The user owns these clothes:

${wardrobe.join(", ")}

Analyze the wardrobe and suggest:

1. Best outfit combinations
2. Missing clothes
3. Fashion advice
4. Shopping recommendations
`;

  return await generateFashionResponse(prompt);
}

export async function fashionChat(
  message: string
): Promise<string> {
  const prompt = `
You are Make-It-Wear-It AI,
an intelligent fashion stylist.

Answer this question professionally.

Question:

${message}
`;

  return await generateFashionResponse(prompt);
}