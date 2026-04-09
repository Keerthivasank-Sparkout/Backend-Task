const validateOtp = (user,otp)=>{
    if(!user.otp || !user.otpExpireAt) return {value : false , message:"OTP not Found"};

    if(String(user.otp) !== String(otp)) return {value : false , message:"Invalid OTP"};

    if(user.otpExpireAt < Date.now()) return {value : false , message:"OTP Expired"};

    return {value:true , message:"verified"}
}
module.exports=validateOtp