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
        default:Date.now(),
        select:false
    },
    startDates:[Date],
    is_deleted:{
        type:Boolean,
        default:false,
        select:false
    },
    startLocation:{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        coordinates:[Number],
        address:String,
        description:String
    },
    locations:[
        {
            type:{
                type:String,
                default:'Point',
                enum:['Point']
            },
            coordinates:[Number],
            address:String,
            description:String,
            day:Number
        }
    ],
    guides:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
    ],
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    versionKey: false
});
tourSchema.virtual('durationWeek').get(function(){
    return this.duration / 7;
})
// tourSchema.pre('save',async function(){
//     const guidesPromise = this.guides.map(async id => await User.findById(id));
//     this.guides = await Promise.all(guidesPromise);
// })
tourSchema.virtual('reviews',{
    ref:'Review',
    foreignField:'tour',
    localField:'_id'
})
tourSchema.pre(/^find/,function(){
    this.populate({
        path:'guides',
        select:'-__v -passwordChangedAt'
    })
})

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;