import { GoogleGenAI } from "@google/genai";

export const aiSuggestion = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Message is required",
            });
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const prompt = `
You are an AI writing assistant inside a chat application.

The user has typed this message:
"${message}"

Generate exactly 3 alternative versions of this message.

Requirements:
1. Keep the original meaning.
2. Do not add information that wasn't in the original.
3. Make each version natural and suitable for a chat.
4. Give three different tones:
   - Professional
   - Friendly
   - Casual

Return ONLY valid JSON:

{
  "suggestions": [
    "suggestion 1",
    "suggestion 2",
    "suggestion 3"
  ]
}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        });

        const result = JSON.parse(response.text);

        return res.json(result);

    } catch (error) {
        console.error("AI suggestion error:", error);

        return res.status(500).json({
            message: "Failed to generate suggestions",
            error: error.message,
        });
    }
};