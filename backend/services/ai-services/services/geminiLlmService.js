const {GoogleGenerativeAI} = require("@google/generative-ai");
const client = new GoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY
});

const MODEL_NAME = "gemini-pro-1.5";

async function getGeminiAnalysis(prompt){
    try{
        const model = client.getGenerativeModel({model: MODEL_NAME});
        const result = await model.generateContent(prompt,{
        maxOutputTokens: 500
    });
    const textOutput= result.response?.text?.();
    return textOutput ||"No text by Gemini.";
    }catch(error){
        throw new Error(error.message);
    }
}

module.exports = getGeminiAnalysis;