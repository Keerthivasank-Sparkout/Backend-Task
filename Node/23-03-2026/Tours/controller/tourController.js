const Tour = require('../model/tourModel')
const mongoose = require('mongoose')

exports.getAllTours = async (req, res) => {
    try {
        //1.Filtering
        const queryObj = { ...req.query }
        const exclusiveFileds = ['page', 'sort', 'limit', 'fields'];
        exclusiveFileds.forEach((el) => delete queryObj[el]);

        //2.Advance Fitering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        const parsedQuery = JSON.parse(queryStr);
        //add additional condition
        parsedQuery.is_deleted = { $ne: true };
        let query = Tour.find(parsedQuery).lean()

        //3. Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy);
        }
        else {
            query = query.sort('-createdAt')
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }
        else {
            query = query.select('-__v');
        }

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const totalPage = await Tour.countDocuments();
            if (skip > totalPage) {
                throw new Error("this is does not exits")
            }
        }
        const tour = await query;
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
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}
exports.createTour = (req, res) => {
    const tour = req.body;
    try {
        const newTour = new Tour(tour)
        newTour.save()
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }

}
exports.getTour = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }

}
exports.updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
        res.status(200).json({
            status: "success",
            message: "updated successfully",
            data: {
                tour
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}
exports.deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        const is_deleted = await Tour.findByIdAndUpdate(id, { is_deleted: true })
        if (is_deleted) {
            res.status(200).json({
                status: "success",
                message: "deleted successfully"
            });
        }

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message
        });
    }


}