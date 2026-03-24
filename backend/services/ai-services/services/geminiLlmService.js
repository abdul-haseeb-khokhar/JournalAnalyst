const {GoogleGenerativeAI} = require("@google/generative-ai");
const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_NAME = "gemini-2.5-flash";

async function getGeminiAnalysis(prompt){
    try{
        const model = client.getGenerativeModel({
            model: MODEL_NAME,
            generationConfig: { maxOutputTokens: 2048}
        });
        const result = await model.generateContent(prompt);
        const textOutput= result.response?.text?.();
        return textOutput ||"No text by Gemini.";
    }catch(error){
        throw new Error(error.message);
    }
}

module.exports = getGeminiAnalysis;