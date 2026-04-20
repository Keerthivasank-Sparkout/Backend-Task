const express = require('express');
const authContoller = require('../Controller/authController');
const userService = require('../Service/userService');
const userController = require('../Controller/userController');
const { auth,requireRole } = require('../middleware/authMiddleware');
const { requireCsrf } = require('../utils/cookies');

const router = express.Router();

router.route('/login').post(authContoller.login)
router.route('/register').post(authContoller.register)
router.route('/logout').post(requireCsrf,authContoller.logout)
router.route('/user').get(auth,userController.getUser)
router.route('/users').get(auth,requireRole('admin'),userController.listUser)


module.exports = router
