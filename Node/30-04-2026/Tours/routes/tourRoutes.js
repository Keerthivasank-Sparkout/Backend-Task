const express = require('express')
const auth = require('../middleware/auth-middleware')
const tourControl = require('../controller/tourController')
const Tour = require('../model/tourModel')

const router = express.Router();

router.route('/top-5-cheap').get([auth.protect, auth.authorize('tour', 'read'), tourControl.alishTour], tourControl.getAllTours);
router.route('/tour-stats').get(auth.protect, auth.authorize('tour', 'read'), tourControl.TourStats);
router.route('/getMonthlyPlan/:year').get(auth.protect, auth.authorize('tour', 'read'), tourControl.getMonthlyPlan);
router
    .route('/')
    .get(auth.protect, auth.authorize('tour', 'read'), tourControl.getAllTours)
    .post(auth.protect, auth.authorize('tour', 'create'), tourControl.createTour)

router
    .route('/:id')
    .get(auth.protect, auth.authorize('tour', 'read'), tourControl.getTour)
    .patch(auth.protect, auth.authorize('tour', 'update', { model: Tour }), tourControl.updateTour)
    .delete(auth.protect, auth.authorize('tour', 'delete', { model: Tour }), tourControl.deleteTour)

module.exports =router;
