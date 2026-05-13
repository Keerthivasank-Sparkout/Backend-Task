const express = require('express')
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const auth = require('../middleware/auth-middleware')
const User = require('../model/userModel')


const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/reset-password').post(authController.resetPassword)
router.route('/verify-otp').post(authController.verifyOtp)
router.route('/changePassword').post(auth.protect,authController.changePassword)


router
        .route('/')
        .get(auth.protect, auth.authorize('user', 'read'), userController.getAllUsers)
        .post(auth.protect, auth.authorize('user', 'create'), userController.createUser);
router
        .route('/:id')
        .get(auth.protect, auth.authorize('user', 'read', { model: User, ownerField: '_id' }), userController.getUser)
        .patch(auth.protect, auth.authorize('user', 'update', { model: User, ownerField: '_id' }), userController.updateUser)
        .delete(auth.protect, auth.authorize('user', 'delete', { model: User, ownerField: '_id' }), userController.deleteUser);

module.exports =router;
