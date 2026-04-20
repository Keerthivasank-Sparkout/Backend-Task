const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,"user must be enter the first name"]
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:[true,"user must be enter the email"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"user must be enter the password"],
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,"user must be enter the confirm password"]
    },
    role:{
        type:String,
        enum:["admin","user"]
    }
})

userSchema.pre('save',async function(next){
 if(!this.isModified('password')) {
    this.confirmPassword = undefined;
    return next();
 }
    this.password = await bcrypt.hash(this.password,10);
    this.confirmPassword=undefined;
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);    
}

const Users = mongoose.model('Users',userSchema);



module.exports = Users;
