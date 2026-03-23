const express = require('express')

const tourControl = require('../controller/tourController')

const router = express.Router();

router
    .route('/')
    .get(tourControl.getAllTours)
    .post(tourControl.createTour)

router
    .route('/:id')
    .get(tourControl.getTour)
    .patch(tourControl.updateTour)
    .delete(tourControl.deleteTour)

module.exports =router;