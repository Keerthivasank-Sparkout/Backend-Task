const mongoose = require('mongoose')
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    duration:{
        type:Number,
        required:true
    },
    maxGroupSize:{
        type:Number,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    },
    ratingsAverage: {
        type: Number,
        required: true
    },
    ratingsQuntity:{
        type:Number,
        default:0
    },
    price: {
        type: Number,
        required: true
    },
    priceDiscount:{
        type:Number
    },
    summary:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String,
        required:true
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    startDates:[Date],
    is_deleted:{
        type:Boolean,
        default:false
    }
})
const Tour = mongoose.model('tours', tourSchema);
module.exports = Tour;