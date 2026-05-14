const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { getCurrentUser, googleLogin, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/google', googleLogin);
router.get('/me', authMiddleware, getCurrentUser);
router.post('/logout', logout);

module.exports = router;
