
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key should be set.
  console.warn("Gemini API key not found. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || 'YOUR_API_KEY_HERE' });

export const generateMarketReport = async (topic: string): Promise<string> => {
  if (!API_KEY) return "API Key not configured. Please set up your environment.";
  try {
    const prompt = `
      Act as a Senior Data Analyst for a financial firm.
      Generate a concise but insightful market trend report on the following topic: "${topic}".
      The report should be well-structured, easy to understand for investors, and include:
      1. A brief overview of the current trend.
      2. Key factors driving this trend.
      3. Potential opportunities and risks for mutual fund investors.
      4. A concluding summary.
      Format the response in Markdown.
    `;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating market report:", error);
    return "Failed to generate report. The AI service may be unavailable.";
  }
};

export const generateEducationalArticle = async (topic: string): Promise<string> => {
    if (!API_KEY) return "API Key not configured. Please set up your environment.";
    try {
        const prompt = `
        Act as an experienced Financial Advisor.
        Write a clear, comprehensive, and engaging educational article for a novice investor on the topic: "${topic}".
        The article should:
        1. Start with a simple, relatable introduction.
        2. Explain complex concepts in simple terms, using analogies if helpful.
        3. Cover the key aspects, benefits, and potential risks related to the topic.
        4. Provide actionable tips or things to consider.
        5. Conclude with an encouraging summary.
        Format the response in Markdown with headings and lists for readability.
        `;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating educational article:", error);
        return "Failed to generate article. The AI service may be unavailable.";
    }
};

export const getInvestmentAdvice = async (userProfile: string): Promise<string> => {
    if (!API_KEY) return "API Key not configured. Please set up your environment.";
    try {
        const prompt = `
        Act as a certified Financial Advisor.
        Based on the following investor profile, provide personalized mutual fund investment advice:
        ---
        Investor Profile: "${userProfile}"
        ---
        Your advice should:
        1. Analyze the investor's profile (age, goals, risk tolerance).
        2. Suggest a suitable asset allocation strategy (e.g., percentage in Equity, Debt, Hybrid funds).
        3. Recommend 2-3 specific types of mutual funds that align with the strategy (e.g., "Large-cap equity fund", "Short-duration debt fund"). Do not recommend specific fund names.
        4. Briefly explain the reasoning behind your recommendations.
        5. Include a disclaimer about market risks and the importance of consulting a human advisor.
        Format the response in Markdown.
        `;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error getting investment advice:", error);
        return "Failed to get advice. The AI service may be unavailable.";
    }
};
