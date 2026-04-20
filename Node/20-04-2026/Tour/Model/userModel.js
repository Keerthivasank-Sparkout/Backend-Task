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
        required:[true,"user must be enter the confirm password"],
        validate: {
            validator: function(value) {
                return value === this.password;
            },
            message: "password and confirm password must match"
        }
    },
    role:{
        type:String,
        enum:["admin","user"]
    }
})
userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return 
    }
    this.password = await bcrypt.hash(this.password,10)
    this.confirmPassword = undefined;
})
userSchema.methods.comparePassword = async function(password){
    if(await bcrypt.compare(password,this.password)){
        return true;
    }
    return false;
}

const Users = mongoose.model('Users',userSchema);



module.exports = Users;
