const express = require('express');
const authContoller = require('../Controller/authController');
const userService = require('../Service/userService');
const userController = require('../Controller/userController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/login').post(authContoller.login)
router.route('/register').post(authContoller.register)
router.route('/logout').post(auth,authContoller.logout)
router.route('/user').get(auth,userController.getUser)
router.route('/users').get(auth,userController.listUser)


module.exports = router
