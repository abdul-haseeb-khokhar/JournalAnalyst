const formatTradesForAi = (trades) =>{
    return trades.map((t, index) =>{
        return `
        Trade ${index+1}:
        Pair: ${t.pair}
        Position: ${t.position}
        Entry: ${t.entryPrice}
        Exit: ${t.exitPrice}
        Profit/Loss: ${t.profitLoss}
        Strategy: ${t.strategy}
        Date: ${t.createdAt}
        Notes: ${t.notes}`;
    }).join('\n');
};

module.exports = formatTradesForAi;