import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function askFashionAI(question: string) {

    const model =
        genAI.getGenerativeModel({
            model:"gemini-1.5-flash"
        });

    const prompt = `
You are an expert fashion stylist.

Answer professionally.

Question:
${question}
`;

    const result =
        await model.generateContent(prompt);

    return result.response.text();

}