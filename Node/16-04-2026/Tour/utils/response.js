exports.successResponse = (res,statusCode,msg,data={})=>{
    res.status(statusCode).json({
        status_code:statusCode,
        status:true,
        msg,
        data
    })
}
const capitalizeFirst = (str = '') => str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
exports.ErrorResponse = (res, statusCode, msg, error = null, data = {}) => {
    return res.status(statusCode).json({
        status_code: statusCode,
        status: false,
        message: capitalizeFirst(msg),
        error: error?.message || error,
        data
    });
};