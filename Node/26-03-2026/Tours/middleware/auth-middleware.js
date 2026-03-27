const AppError = require('../utils/appError');
const {promisify} = require('util');
const catchError = require('../utils/catchError');
const jwt = require('jsonwebtoken')

exports.protect = catchError(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) return next(new AppError('Not have permission, Please log in again to get access token',401))

    // const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    
    next();
})