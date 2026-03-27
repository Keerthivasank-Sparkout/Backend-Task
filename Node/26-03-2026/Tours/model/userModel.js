const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    password:{
        type:String,
        required:[true,'user must enter the password'],
        minlength:8,
        select:false
    },
    confirmPass:{
        type:String
    }
});

userSchema.pre('save',async function(){
    if(this.isModified('password') && !isBcryptHash(this.password)){
        this.password =await bcrypt.hash(this.password,10);
        this.confirmPass=undefined;
    }
})

userSchema.methods.correctPassword=async (candidatePassword,userPassword)=>{
    return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model('User',userSchema);


module.exports = User;