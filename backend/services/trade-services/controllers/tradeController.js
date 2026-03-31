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
exports.getAllTrades = async (req, res) =>{
    try{
        const userId = req.user.id;
        const trades = await Trade.find({userId}).sort({createdAt : -1});
        res.json(
            trades
        )
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};
exports.getCustomizedTrades = async (req, res) => {
    try{
        const userId = req.user.id;
        const {from , to } = req.query;
        let filter = {userId};
        if(from || to){
            filter.createdAt = {};
            if(from){
                filter.createdAt.$gte = new Date(from);
            }
            if(to){
                filter.createdAt.$lte = new Date(to);
            }
        }
        const customizedTrades = await Trade.find(filter).sort({createdAt : -1});
        res.json(
            customizedTrades
        );
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
};
    exports.editTrade = async (req, res) => {
        try{
            const {tradeId} = req.params;
            const userId = req.user.id;
            const updateData = req.body;

            const trade = await Trade.findById(tradeId);
            if(!trade){
                return res.status(404).json({
                   success: false,
                   message: "Trade not found" 
                });
            }
            if(trade.userId.toString() !== userId.toString()){
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
            
            const updateTrade = await Trade.findByIdAndUpdate(
                tradeId,
                updateData,
                {new: true, runValidators: true}
            );

            res.status(200).json({
                success: true,
                message: 'Trade updated successfully',
                data: updateTrade
            });
        }catch(error){
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };


exports.deleteTrade = async (req, res) => {
    try{
        const {tradeId} = req.params;
        const userId = req.user.id;

        const trade = await Trade.findById(tradeId);

        if(!trade){
            return res.status(404).json({
                success: false,
                message: "Trade not found"
            })
        }
        if(trade.userId.toString() !== userId.toString()){
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await Trade.findByIdAndDelete(tradeId);
        res.status(200).json({
            success: true,
            message: 'Trade Deleted Successfully'
        });
    } catch (err){
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};