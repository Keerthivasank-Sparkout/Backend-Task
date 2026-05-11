const User = require('../model/userModel')
const catchError = require('../utils/catchError')
const AppError = require('../utils/appError')

const filterObj = (obj, allowedFields) => {
    const filteredObj = {};
    Object.keys(obj).forEach((key) => {
        if (allowedFields.includes(key)) filteredObj[key] = obj[key];
    });
    return filteredObj;
};

exports.getAllUsers =catchError(async(req,res,next)=>{
    if (req.permissionScope !== 'all') {
        return next(new AppError('Access denied. you not have permission', 403));
    }
    const user = await User.find();
    res.status(200).json({
        status:"success",
        data:{
            user,
        }
    })
});
exports.getUser = catchError(async (req,res,next)=>{
    const user = req.resource || await User.findById(req.params.id);
    if (!user) return next(new AppError('user not found', 404));

    res.status(200).json({
        status:'success',
        data: {
            user
        }
    })
})
exports.createUser = catchError(async (req,res,next)=>{
    if (req.permissionScope !== 'all') {
        return next(new AppError('Access denied. you not have permission', 403));
    }

    const user = await User.create(req.body);
    res.status(201).json({
        status:'success',
        data: {
            user
        }
    })
})
exports.updateUser = catchError(async (req,res,next)=>{
    if (req.body.password || req.body.confirmPass) {
        return next(new AppError('This route is not for password updates. Please use changePassword.', 400));
    }

    const allowedFields = req.permissionScope === 'all'
        ? ['name', 'email', 'photo', 'role', 'permissions']
        : ['name', 'email', 'photo'];
    const filteredBody = filterObj(req.body, allowedFields);
    const user = await User.findByIdAndUpdate(req.params.id, filteredBody, {
        new: true,
        runValidators: true
    });

    if (!user) return next(new AppError('user not found', 404));

    res.status(200).json({
        status:'success',
        data: {
            user
        }
    })
})
exports.deleteUser = catchError(async (req,res,next)=>{
    if (req.permissionScope !== 'all') {
        return next(new AppError('Access denied. you not have permission', 403));
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new AppError('user not found', 404));

    res.status(204).json({
        status:'success',
        data:null
    })
})
