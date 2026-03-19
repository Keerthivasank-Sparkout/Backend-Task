const Tour = require('../model/tourModel')
const mongoose = require('mongoose')

exports.getAllTours = async (req, res) => {
    try {
        const tour = await Tour.find({is_deleted:{$ne:true}}).lean()
        if(tour.length === 0 ){
            res.status(200).json({
            status: "failed",
            message:"Tour list is Empty"
        })
        }
        res.status(200).json({
            status: "success",
            result:tour.length,
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
        const tour = await Tour.findOne({_id:req.params.id,is_deleted:{$ne:true}});
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
        const tour = await Tour.findByIdAndUpdate(id, req.body,{returnDocument:'after'})
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
        const is_deleted = await Tour.findByIdAndUpdate(id,{is_deleted:true})
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