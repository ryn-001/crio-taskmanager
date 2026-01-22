const User = require("../models/users.model");
const {UserServices} = require("../services/index.services");
const jwt = require('jsonwebtoken');

const sendToken = (user,statusCode,res) => {
    const days = Number(process.env.JWT_EXPIRY) || 1;

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: `${days}d`
    })

    const cookieOption = {
        expires: new Date(Date.now() + days*24*60*60*1000),
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    }

    res.status(statusCode).cookie('token',token,cookieOption).json({
        success: true,
        user: {
            id: user._id, 
            username: user.username,
            email: user.email,
        }
    })
}

const registerUser = async (req,res) => {
    try{

        const {fullname,username,email,password} = req.body;

        const checkEmail = await User.findOne({email});
        if(checkEmail) return res.status(400).json({message: 'User with email already exist'});

        const checkUsername = await User.findOne({username});
        if(checkUsername) return res.status(400).json({message: 'User with username already exist'});

        const user = await User.create({fullname,username,email,password});

        sendToken(user,201,res);
    }catch(err){
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

const loginUser = async (req,res) => {
    try{

        const {email,password} = req.body;
        
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({success: false, message: 'User with given email not exist'});

        const checkPassword = await user.comparePassword(password);
        if(!checkPassword) return res.status(400).json({success: false, message: 'Invalid password'});

        sendToken(user,200,res);

    }catch(err){
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

const logoutUser = (req,res) => {
    try{

        res.cookie('token','none',{
            expires: new Date(Date.now()),
            httpOnly: true 
        })

        return res.status(200).json({
            success: true,
            message: 'User looged out successfully'
        })
        
    }catch(err){
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {registerUser,loginUser,logoutUser};