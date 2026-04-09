const User = require('../model/userModel')
const catchError = require('../utils/catchError')


exports.getAllUsers =catchError(async(req,res,next)=>{
    const user = await User.find();
    res.status(200).json({
        status:"success",
        data:{
            user,
        }
    })
});
exports.getUser = (req,res)=>{
    res.status(500).json({
        status:'success',
        message:"this route is not yet defind"
    })
}
exports.createUser = (req,res)=>{
    res.status(500).json({
        status:'success',
        message:"this route is not yet defind"
    })
}
exports.updateUser = (req,res)=>{
    res.status(500).json({
        status:'success',
        message:"this route is not yet defind"
    })
}
exports.deleteUser = (req,res)=>{
    res.status(500).json({
        status:'success',
        message:"this route is not yet defind"
    })
}