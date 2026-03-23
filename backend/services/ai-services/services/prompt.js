const tradeAnalysisPrompt = (tradeText) =>
    `You are an expert trading coach.

    Here is the user's trade history:
    
    ${tradeText}
    
    Provide a clear analysis with:
    1. Win/Loss assessment
    2. Strengths & weakness
    3. Personalized suggestions
    `;

module.exports = {tradeAnalysisPrompt};