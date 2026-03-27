const AppError = require('./appError')
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}
const handleJWTError = err => new AppError('Invalid Token. Please log in again.', 401)
const handleJWTExpiredError = err => new AppError('Token Expired. please log in again', 401)
const sendErrorPro = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        res.status(500).json({
            status: 'Error',
            message: 'Something Went worng'
        })
    }
}
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error'
    if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        if (err.name === 'JsonWebTokenError') error = handleJWTError(error);
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError(error)

        sendErrorPro(err, res);
    }
    else if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
}