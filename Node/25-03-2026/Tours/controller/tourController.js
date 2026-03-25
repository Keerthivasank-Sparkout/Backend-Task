const Tour = require('../model/tourModel')
const APIFeature = require('../utils/APIFeature')
const catchError = require('../utils/catchError')



exports.alishTour = (req, res, next) => {
    req.toutOption = {
        limit: 5,
        sort: '-ratingsAverage,-price',
        fields: 'name,price',
        page: 1
    };
    next();
}
exports.getAllTours = catchError(async (req, res) => {
    const queryParams = {
        ...req.query,
        ...(req.toutOption || {})
    }
    const feature = new APIFeature(Tour.find(), queryParams)
        .filter()
        .sort()
        .limitField()
        .paginate()
    const tour = await feature.query;
    if (tour.length === 0) {
        return res.status(200).json({
            status: "failed",
            message: "Tour list is Empty"
        })
    }
    res.status(200).json({
        status: "success",
        result: tour.length,
        data: {
            tour
        }
    })

})
exports.createTour = catchError(async (req, res) => {
    const tour = req.body;
    const newTour = new Tour(tour)
    await newTour.save()
    res.status(201).json({
        status: "success",
        data: {
            tour: newTour
        }
    })

})
exports.getTour = catchError(async (req, res) => {
    const tour = await Tour.findOne({ _id: req.params.id, is_deleted: { $ne: true } });
    if (!tour) {
        return res.status(404).json({
            status: "failed",
            message: "Tour not found"
        });
    }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    });

})
exports.updateTour = catchError(async (req, res) => {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
    res.status(200).json({
        status: "success",
        message: "updated successfully",
        data: {
            tour
        }
    });
})
exports.deleteTour = catchError(async (req, res) => {
    const id = req.params.id;
    const is_deleted = await Tour.findByIdAndUpdate(id, { is_deleted: true })
    if (is_deleted) {
        res.status(200).json({
            status: "success",
            message: "deleted successfully"
        });
    }
})
exports.TourStats = catchError(async (req, res) => {
    const stats = await Tour.aggregate([
        {
            $match: {
                ratingsAverage: { $gte: 4.5 }
            }
        },
        {
            $group: {
                _id: '$difficulty',
                averageRatings: { $avg: '$ratingsAverage' },
                averagePrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        }

    ])
    res.status(200).json({
        status: "success",
        message: "updated successfully",
        data: {
            stats
        }
    });
})
exports.getMonthlyPlan =catchError(async (req, res) => {
        const year = req.params.year * 1;
        const tour = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numOfTourStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $sort: { numOfTourStarts: -1 }
            },
            {
                $project: {
                    _id: 0,
                }
            },
            {
                $limit: 6
            }
        ])
        res.status(200).json({
            status: "success",
            result: tour.length,
            data: {
                tour
            }
        })
})