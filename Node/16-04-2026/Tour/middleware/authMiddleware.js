const { HttpStatus } = require("../utils/http")
const { userMessage } = require("../utils/message")
const { ErrorResponse } = require("../utils/response")
const User = require("../Model/userModel");
const { verifyToken } = require("../utils/jwt");

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

        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return ErrorResponse(res,HttpStatus.UNAUTHORIZED,userMessage.TOKEN_MISSING);
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if(!user){
            return ErrorResponse(res,HttpStatus.UNAUTHORIZED,userMessage.UNAUTHORIZED);
        }

        req.user = user;
        next();
    } catch (error) {
        return ErrorResponse(res,HttpStatus.UNAUTHORIZED,userMessage.UNAUTHORIZED,error);
    }
}
