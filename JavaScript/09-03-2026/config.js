require('dotenv').config();

const config = {
  openWeatherKey: process.env.OPEN_WEATHER_KEY,
  weatherApiKey: process.env.WEATHER_API_KEY
};

module.exports = config;