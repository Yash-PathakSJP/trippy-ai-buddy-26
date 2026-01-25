import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not set in .env");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// Using gemini-1.5-flash for a good balance of speed and cost (free tier available)
export const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" 
});

export async function generateContent(prompt: string): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error("API key is not configured");
    }

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}  