const express = require('express')

const tourControl = require('../controller/tourController')

const router = express.Router();

router.route('/top-5-cheap').get([tourControl.alishTour],tourControl.getAllTours);
router.route('/tour-stats').get(tourControl.TourStats);
router.route('/getMonthlyPlan/:year').get(tourControl.getMonthlyPlan);
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