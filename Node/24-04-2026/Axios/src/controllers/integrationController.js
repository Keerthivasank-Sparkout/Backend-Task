const integrationService = require("../services/integrationService");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");

const getHealth = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "Axios integration service is running",
  });
});

const getWeather = asyncHandler(async (req, res) => {
  const city = req.query.city?.trim();

  if (!city) {
    throw new AppError('Query parameter "city" is required', 400);
  }

  const result = await integrationService.fetchWeatherByCity(city);

  res.json({
    success: true,
    data: result,
  });
});

module.exports = {
  getHealth,
  getWeather,
};
