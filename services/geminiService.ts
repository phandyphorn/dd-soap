import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

export const generateProductDescription = async (name: string, scent: string, ingredients: string): Promise<string> => {
  if (!ai) {
    throw new Error("API Key not configured. AI features are unavailable.");
  }

  try {
    const prompt = `Write a short, alluring, and sensory-rich sales description (max 2 sentences) for a handmade soap named "${name}". 
    The scent profile is "${scent}" and key ingredients are "${ingredients}". 
    Make it sound luxurious and artisanal.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate description via Gemini.");
  }
};