const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    pair:{
        type: String,
        required : true
    },
    position:{
        type: String,
        enum: ['buy','sell'],
        required: true
    },
    entryPrice:{
        type: Number,
        required: true
    },
    exitPrice:{
        type: Number
    },
    quantity:{
        type:Number,
        required: true
    },
    profitLoss:{
        type: Number,
        required: true
    },
    strategy:{
        type: String
    },
    notes:{
        type: String
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Trade',tradeSchema);