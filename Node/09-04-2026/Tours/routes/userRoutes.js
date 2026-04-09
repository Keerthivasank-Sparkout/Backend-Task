const express = require('express')
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const auth = require('../middleware/auth-middleware')
const userValidator = require('../validators/userValidator');


const router = express.Router();

router.route('/signup').post(userValidator.validate('signup'), authController.signup)
router.route('/login').post(userValidator.validate('login'), authController.login)
router.route('/forgotPassword').post(userValidator.validate('forgotPassword'), authController.forgotPassword)
router.route('/reset-password').post(userValidator.validate('resetPassword'), authController.resetPassword)
router.route('/verify-otp').post(userValidator.validate('verifyOtp'), authController.verifyOtp)
router.route('/changePassword').post(auth.protect, userValidator.validate('changePassword'), authController.changePassword)


router
        .route('/')
        .get(auth.protect,userController.getAllUsers)
        .post(userValidator.validate('createUser'), userController.createUser);
router
        .route('/:id')
        .get(userController.getUser)
        .patch(userValidator.validate('updateUser'), userController.updateUser)
        .delete(userController.deleteUser);

module.exports =router;
