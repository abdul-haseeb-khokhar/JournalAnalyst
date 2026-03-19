const Trade = require('../models/tradeModel');

exports.createTrade = async (req, res)=>{
    try{
        const userId = req.user.id;

        const {pair, position, entryPrice, exitPrice, quantity, profitLoss, strategy, notes} =req.body;

        const newTrade = new Trade({
            userId, pair, position, entryPrice, exitPrice, quantity, profitLoss, strategy, notes
        });
        await newTrade.save();

        res.status(201).json({
            message: "Trade added successfully",
            trade : newTrade
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getTrades = async (req, res) => {
    try{
        const userId = req.user.id;

        const trades = await Trade.find({userId}).sort({createdAt : -1});
        res.json({
            trades
        });
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
};