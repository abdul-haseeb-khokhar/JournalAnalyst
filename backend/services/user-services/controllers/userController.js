const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const generateToken = (userId) => {
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );
}

exports.register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await userModel.findOne({email});
        if(existingUser && existingUser.provider === 'google'){
            return res.status(400).json({
                message: "Email already registered with Google. Please login with Google."
            });
        }

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
        // console.log(user)
        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }

        if (user.provider === 'google') {
            return res.status(400).json({
                message: "Please login with Google"
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message : "Invalid Credentials"
            });
        }

        const token = generateToken(user._id);

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

exports.googleAuth = async (req, res) => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}` +
    `&response_type=code`+
    `&scope=openid email profile`+
    `&prompt=select_account`;
    res.json({
        url: googleAuthUrl
    });
};

exports.googleCallback = async (req, res) => {
    try{
        const {code} =req.query;
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token',{
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_CALLBACK_URL,
            grant_type: 'authorization_code'
        });

        const tokenObj = tokenResponse.data;
        const access_token = tokenObj.access_token;
        const userInfoResponse= await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers : {Authorization: `Bearer ${access_token}`}
        });

        const {sub: googleId, name, email} = userInfoResponse.data;
        let user = await userModel.findOne({ email });
        if(user && user.provider === 'local'){
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=email_registered`);
        }

        if(!user){
            user = await userModel.create({
                name, email, googleId, provider: 'google', password: null
            });
        }

        const token = generateToken(user._id);

        res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);

    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};