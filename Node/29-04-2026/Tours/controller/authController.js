const User = require('../model/userModel');
const catchError = require('../utils/catchError');
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')

const signedToken = (id)=>jwt.sign({id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
        })
const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return { otp, otpExpiresAt };
};
exports.signup = catchError(async (req, res, next) => {
   
    const user = req.body;
    if (user.password !== user.confirmPass) {
        return next(new AppError('Invalid Confirm Password',400))
    } else {
        const newUser = await User.create({
            name:user.name,
            email:user.email,
            password:user.password,
            confirmPass:user.confirmPass,
            passwordChangedAt:user.passwordChangedAt,
            role:user.role
        });
        const token = signedToken(user._id)
        res.status(201).json({
            status: 'success',
            data: {
                user:newUser,
                session:token
            }
        })
    }
})

exports.login = catchError(async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return next(new AppError('Please Provide email and password',400))
    }

    const user = await User.findOne({email}).select('+password');
    if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email and password',400))
    }
    const token=signedToken(user._id)
    res.status(200).json({
        status:'success',
        token,
    })

})
 
exports.forgotPassword = catchError(async(req,res,next)=>{
    const currentUser = await User.findOne({email:req.body.email})
    if(!currentUser) return next(new AppError('user not found',404));
    const resetToken = currentUser.createPasswordResetToken();
    await currentUser.save({validateBeforeSave:false})

})
exports.verifyOtp = catchError(async (req,res,next)=>{
    const {email,otp,expireAt,purpose} = req.body;
    const user = await User.findOne({email});
    if(!user)return next(new AppError('user not found, check email id'));
    if(user.otp === otp && user.otpExpireAt <= expireAt && user.otpPurpose === purpose){

        return true;
    }
    return false;
})
exports.resetPassword = catchError(async(req,res,next)=>{
    
})
