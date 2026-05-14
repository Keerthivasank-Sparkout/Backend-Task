const express = require('express');

const { getConfig, getHealth } = require('../controllers/appController');

const router = express.Router();

router.get('/config', getConfig);
router.get('/health', getHealth);

module.exports = router;
