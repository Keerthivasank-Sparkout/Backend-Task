const express = require("express");

const integrationController = require("../controllers/integrationController");

const router = express.Router();

router.get("/health", integrationController.getHealth);
router.get("/api/weather", integrationController.getWeather);

module.exports = router;
