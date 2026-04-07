const AppError = require('../utils/appError');
const {promisify} = require('util');
const catchError = require('../utils/catchError');
const jwt = require('jsonwebtoken')
const User = require('../model/userModel');

exports.protect = catchError(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) return next(new AppError('Not have permission, Please log in again to get access token',401));

    const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

    const currentUser = await User.findById(decode.id);
    if(!currentUser) return next(new AppError('The user belonging to the token, does not longer exits.'));

   if (currentUser.changePasswordAfter(decode.iat)) {
        return next(new AppError("user recently changed password! please login again..", 401));
    }
    req.user = currentUser;
    next();
})
exports.restrictTo=(...roles)=>{
    return ((req,res,next)=>{
        if(!roles.includes(req.user.role)){
            console.log(req.user.role);
            return next(new AppError('Access denied. you not have permission',403));
        }
        next()
    })
    
}