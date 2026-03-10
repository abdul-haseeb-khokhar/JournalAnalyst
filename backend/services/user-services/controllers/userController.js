const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.login = async (req, res) => {
    try {
        const {email , password} = req.body;
        const user = await userModel.findOne({ email});

        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message : "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.json({
            message: "Login Successful",
            token
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.json({
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};