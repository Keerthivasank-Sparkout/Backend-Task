const User = require('../model/userModel');
const catchError = require('../utils/catchError');
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const sendEmail = require('../utils/email')
const validateOpt = require('../utils/validateOtp')
const bcrypt = require('bcrypt');
const Session = require('../model/sessionModel');

const signedToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
})
exports.signup = catchError(async (req, res, next) => {

    const user = req.body;
    if (user.password !== user.confirmPass) {
        return next(new AppError('Invalid Confirm Password', 400))
    } else {
        const newUser = await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            confirmPass: user.confirmPass,
            passwordChangedAt: user.passwordChangedAt,
            role: user.role
        });
        const resetToken = newUser.createPasswordResetOtp();
        await newUser.save({ validateBeforeSave: false })
        const msg = `Your Sign up OTP is ${resetToken}. it's valid for only 10 minutes`
        await sendEmail({
            email: req.body.email,
            subject: "OTP for sign up",
            message: msg
        })
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    }
})

exports.login = catchError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please Provide email and password', 400))
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email and password', 400))
    }
     const resetToken = user.createPasswordResetOtp();
        await user.save({ validateBeforeSave: false })
        const msg = `Your Login OTP is ${resetToken}. it's valid for only 10 minutes`
        await sendEmail({
            email: req.body.email,
            subject: "OTP for Login",
            message: msg
        })
    res.status(200).json({
        status: 'success',
        message:"Otp send to mail,check"
    })

})

exports.forgotPassword = catchError(async (req, res, next) => {
    const currentUser = await User.findOne({ email: req.body.email })
    if (!currentUser) return next(new AppError('user not found', 404));
    const resetToken = currentUser.createPasswordResetOtp();
    await currentUser.save({ validateBeforeSave: false })
    const msg = `Your Password Reset OTP is ${resetToken}. it's valid for only 10 minutes`
    await sendEmail({
        email: req.body.email,
        subject: "OTP for password reset",
        message: msg
    })
    res.status(200).json({
        status: 'success',
        message: 'OTP sent successfully'
    })

})
exports.verifyOtp = catchError(async (req, res, next) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new AppError('user not found, check email id'));
    const verified = validateOpt(user, otp);
    if (!verified.value) return next(new AppError(`${verified.message}`, 403));
    user.otp = undefined;
    user.otpExpireAt = undefined;
    await user.save(user)
    const token = signedToken(user._id)
    res.status(200).json({
        status: 'success',
        message: 'OTP verified',
        session:token
    })

})
exports.resetPassword = catchError(async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new AppError('user not found. check email', 404));
    if (password !== confirmPassword) return next(new AppError('Invalid Confirm Password', 400));
    user.password = password;
    user.passwordChangedAt = Date.now();
    await user.save(user);
    res.status(200).json({
        status: 'success',
        message: 'password changed successfylly'
    })
})

exports.changePassword = catchError(async (req, res, next) => {
    const { old_password, new_password, confirmPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password')

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
        return next(new AppError('invalid old password', 403));
    }
    if (new_password !== confirmPassword) {
        return next(new AppError('Passwords do not match', 400));
    }
    user.password = new_password;
    user.passwordChangedAt = Date.now();
    await user.save();
    res.status(200).json({
        status: 'success',
        message: "password changed successfully"
    })
})
