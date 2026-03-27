const express = require('express')
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const auth = require('../middleware/auth-middleware')


const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/resetPassword').post(authController.resetPassword)


router
        .route('/')
        .get(auth.protect,userController.getAllUsers)
        .post(userController.createUser);
router
        .route('/:id')
        .get(userController.getUser)
        .patch(userController.updateUser)
        .delete(userController.deleteUser);

module.exports =router;