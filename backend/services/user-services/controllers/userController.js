const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await userModel.create({name, email, password: hashedPassword});
        res.status(201).json({message: 'User created successfully ', user});
    } catch (error){
        res.status(500).json({message: error.message});
    }
};