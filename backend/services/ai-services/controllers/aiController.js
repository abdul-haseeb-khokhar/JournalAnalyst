const axios = require('axios');
const formatTradesForAI = require('../services/analysisService');
const getGeminiAnalysis = require('../services/geminiLlmService');
const {tradeAnalysisPrompt} = require('../services/prompt');
exports.analyze = async (req, res)=>{
    try{
        const token = req.headers.authorization;
        const {from, to} = req.query;
        let query = "";
        if(from && to){
            query=`?from=${from}&to=${to}`;
        }

        const response = await axios.get(
            `${process.env.TRADE_SERVICE_URL}/api/trades/customized-records${query}`,
            {
                headers:{authorization: token},
            }
        );
        const trades = response.data;
        if(!trades || trades.length ===0){
            return res.status(200).json({
                message: "No trades found"
            });
        }
        const tradeText = formatTradesForAI(trades);
        const prompt = tradeAnalysisPrompt(tradeText);

        const aiResult = await getGeminiAnalysis(prompt);
        res.json({
            analysis: aiResult
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}