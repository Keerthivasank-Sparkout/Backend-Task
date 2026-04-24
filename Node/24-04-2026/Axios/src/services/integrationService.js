const { weatherGeoClient, weatherForecastClient } = require("../config/apiClients");
const AppError = require("../utils/appError");

const fetchWeatherByCity = async (city) => {
  const geoResponse = await weatherGeoClient.get("/search", {
    params: {
      name: city,
      count: 1,
    },
  });
  const location = geoResponse.data?.results?.[0];

  if (!location) {
    throw new AppError(`No weather location found for "${city}"`, 404);
  }

  const weatherResponse = await weatherForecastClient.get("/forecast", {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      current: "temperature_2m,wind_speed_10m",
      timezone: "auto",
    },
  });

  return {
    city: location.name,
    country: location.country,
    temperature: weatherResponse.data.current?.temperature_2m,
    windSpeed: weatherResponse.data.current?.wind_speed_10m,
    timezone: weatherResponse.data.timezone,
  };
};

module.exports = {
  fetchWeatherByCity,
};
