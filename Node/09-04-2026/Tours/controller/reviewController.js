const catchError = require('../utils/catchError');
const Review = require('../model/reviewModel');

exports.getAllReview = catchError(async (req,res,next) => {
    const review = await Review.find();
    res.status(200).json({
        status:"success",
        review: review.length,
        data:{
            review
        }
    })
});

exports.createReview = catchError(async(req,res,next)=>{
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    const newReview = await Review.create(req.body);

    res.status(201).json({
        status:"success",
        data:{
            newReview
        }
    })
})