const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto');

const isBcryptHash = (value = '') =>
    /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(String(value));

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'user must enter the name']

    },
    email:{
        type:String,
        required:[true,'User must enter the email'],
        unique:true,
        lowercase:true
    },
    photo:{
        type:String
    },
    role:{
        type:String,
        enum:['user','guide','lead-guide','admin'],
        default:'user'
    },
    password:{
        type:String,
        required:[true,'user must enter the password'],
        minlength:8,
        select:false
    },
    confirmPass:{
        type:String
    },
    passwordChangedAt: Date,
    otp:String,
    otpExpireAt:Date,
    otpPurpose:String
});

userSchema.pre('save',async function(){
    if(this.isModified('password') && !isBcryptHash(this.password)){
        this.password =await bcrypt.hash(this.password,10);
        this.confirmPass=undefined;
    }
})

userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changeTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changeTimestamp;
    }
    return false;
}
userSchema.methods.createPasswordResetToken = function(){
    const token  = crypto.randomBytes(32).toString('hex');
    this.otp = crypto.createHash('sha256').update(token).digest('hex')
    this.otpExpireAt = Date.now() + 10 * 60 * 1000 //10 minutes
    console.log({token},this.otp);
    return token;
}

const User = mongoose.model('User',userSchema);


module.exports = User;