const mongoose = require('mongoose')
const User = require('./userModel')

const sessionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    session_token:{
        type:String,
        required:true
    },
    createdAt:Date,
    updatedAt:Date
})

const Session = new mongoose.model('Session',sessionSchema);

module.exports = Session;