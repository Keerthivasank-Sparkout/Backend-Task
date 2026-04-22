const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    otp:{
        type:Number,
        select:false,
    },
    otpExpire:{
        type:Date,
        select:false,
    }
})
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return
    }
    this.password = await bcrypt.hash(this.password, 10);
    this.otp = Math.floor(100000+Math.random()*900000);
    this.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;