const express = require('express')
const auth = require('../middleware/auth-middleware')
const tourControl = require('../controller/tourController')
const Tour = require('../model/tourModel')

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Tour:
 *       type: object
 *       required:
 *         - name
 *         - duration
 *         - maxGroupSize
 *         - difficulty
 *         - ratingsAverage
 *         - price
 *         - imageCover
 *       properties:
 *         _id:
 *           type: string
 *           example: 663f1c2e8a7f5b0012a12345
 *         name:
 *           type: string
 *           example: The Forest Hiker
 *         duration:
 *           type: number
 *           example: 5
 *         maxGroupSize:
 *           type: number
 *           example: 25
 *         difficulty:
 *           type: string
 *           example: easy
 *         ratingsAverage:
 *           type: number
 *           example: 4.7
 *         ratingsQuntity:
 *           type: number
 *           example: 0
 *         price:
 *           type: number
 *           example: 397
 *         priceDiscount:
 *           type: number
 *           example: 50
 *         summary:
 *           type: string
 *           example: Breathtaking hike through the Canadian Banff National Park
 *         description:
 *           type: string
 *           example: This tour takes you through beautiful forest trails.
 *         imageCover:
 *           type: string
 *           example: tour-1-cover.jpg
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - tour-1-1.jpg
 *             - tour-1-2.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *         createdBy:
 *           type: string
 *           example: 663f1c2e8a7f5b0012a99999
 *         startDates:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *         is_deleted:
 *           type: boolean
 *           example: false
 *         durationWeek:
 *           type: number
 *           example: 0.71
 */

/**
 * @swagger
 * /api/v1/tours:
 *   get:
 *     summary: Get all Tours
 *     description: This API is used to get all tours from the DB
 *     responses:
 *       200:
 *         description: To get all tour details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tour'
 */

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
