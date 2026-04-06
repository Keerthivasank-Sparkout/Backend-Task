const express = require('express');
const reviweController = require('../controller/reviewController')
const authContorller = require('../middleware/auth-middleware')
const router = express.Router();

router
    .route('/')
    .get(authContorller.protect,reviweController.getAllReview)
    .post(authContorller.protect,reviweController.createReview);

module.exports = router;