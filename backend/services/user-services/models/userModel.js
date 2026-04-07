const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        default: null
    },
    googleId:{
        type: String,
        required: false,
        default: null
    },
    provider:{
        type: String,
        enum:['local','google'],
        default: 'local'
    },
    createdAt:{
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User',userSchema);