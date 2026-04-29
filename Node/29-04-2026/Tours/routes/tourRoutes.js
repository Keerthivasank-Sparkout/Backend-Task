const express = require('express')
const auth = require('../middleware/auth-middleware')
const tourControl = require('../controller/tourController')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tours
 *   description: Tour management APIs
 */

/**
 * @swagger
 * /api/v1/tours/top-5-cheap:
 *   get:
 *     summary: Get top 5 cheap tours
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top tours fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.route('/top-5-cheap').get([auth.protect,tourControl.alishTour],tourControl.getAllTours);

/**
 * @swagger
 * /api/v1/tours/tour-stats:
 *   get:
 *     summary: Get tour statistics
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tour statistics fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.route('/tour-stats').get(auth.protect,tourControl.TourStats);

/**
 * @swagger
 * /api/v1/tours/getMonthlyPlan/{year}:
 *   get:
 *     summary: Get monthly tour plan by year
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2026
 *     responses:
 *       200:
 *         description: Monthly plan fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.route('/getMonthlyPlan/:year').get(auth.protect,tourControl.getMonthlyPlan);

/**
 * @swagger
 * /api/v1/tours:
 *   get:
 *     summary: Get all tours
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         example: -price,ratingsAverage
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         example: name,price,difficulty
 *     responses:
 *       200:
 *         description: Tours fetched successfully
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a tour
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourInput'
 *     responses:
 *       201:
 *         description: Tour created successfully
 *       401:
 *         description: Unauthorized
 */
router
    .route('/')
    .get(auth.protect,tourControl.getAllTours)
    .post(auth.protect,tourControl.createTour)

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   get:
 *     summary: Get a tour by ID
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tour fetched successfully
 *       404:
 *         description: Tour not found
 *   patch:
 *     summary: Update a tour by ID
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourInput'
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *   delete:
 *     summary: Delete a tour by ID
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tour deleted successfully
 *       403:
 *         description: Admin access required
 */
router
    .route('/:id')
    .get(auth.protect,tourControl.getTour)
    .patch(auth.protect,tourControl.updateTour)
    .delete([auth.protect,auth.restrictTo('admin')],tourControl.deleteTour)

module.exports =router;
