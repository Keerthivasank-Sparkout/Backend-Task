const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}
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
        sendErrorPro(err, res);
    }
    else if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
}