const express = require('express')
const auth = require('../middleware/auth-middleware')
const tourControl = require('../controller/tourController')

const router = express.Router();

router.route('/top-5-cheap').get([auth.protect,tourControl.alishTour],tourControl.getAllTours);
router.route('/tour-stats').get(auth.protect,tourControl.TourStats);
router.route('/getMonthlyPlan/:year').get(auth.protect,tourControl.getMonthlyPlan);
router
    .route('/')
    .get(auth.protect,tourControl.getAllTours)
    .post(auth.protect,tourControl.createTour)

router
    .route('/:id')
    .get(auth.protect,tourControl.getTour)
    .patch(auth.protect,tourControl.updateTour)
    .delete([auth.protect,auth.restrictTo('admin')],tourControl.deleteTour)

module.exports =router;