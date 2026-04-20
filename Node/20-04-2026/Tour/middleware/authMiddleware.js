const { HttpStatus } = require("../utils/http")
const { userMessage } = require("../utils/message")
const { ErrorResponse } = require("../utils/response")
const User = require("../Model/userModel");
const jwt = require('jsonwebtoken')

exports.auth = async (req,res,next)=>{
    try {
        // Session-based version:
        // if(!req.session || !req.session.userId){
        //     return ErrorResponse(res,HttpStatus.UNAUTHORIZED,userMessage.UNAUTHORIZED);
        // }
        //
        // const user = await User.findById(req.session.userId);
        // if(!user){
        //     return ErrorResponse(res,HttpStatus.UNAUTHORIZED,userMessage.UNAUTHORIZED);
        // }
        //
        // req.user = user;
        // return next();

        const accessToken = req.cookies?.['access_token'];
        if(!accessToken){
            return ErrorResponse(res,HttpStatus.UNAUTHORIZED,userMessage.TOKEN_MISSING);
        }
        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'
        );
        const user = await User.findById(decoded.userId);
        if(!user){
            return ErrorResponse(res,HttpStatus.UNAUTHORIZED,userMessage.UNAUTHORIZED);
        }
        req.user = user;
        next();
    } catch (error) {
        return ErrorResponse(res,HttpStatus.UNAUTHORIZED,userMessage.UNAUTHORIZED,error);
    }
}

exports.requireRole=(role='admin')=>{
    return (req,res,next)=>{
        if(!req.user || req.user.role !== role){
            return ErrorResponse(res,HttpStatus.UNAUTHORIZED,userMessage.UNAUTHORIZED)
        }
        next();
    }
}
