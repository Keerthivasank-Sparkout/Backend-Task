const axios = require("axios");

const AppError = require("../utils/appError");

const createApiClient = (baseURL, defaultHeaders = {}) => {
  const client = axios.create({
    baseURL,
    timeout: 8000,
    headers: {
      Accept: "application/json",
      ...defaultHeaders,
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const message =
          error.response.data?.message ||
          error.response.data?.error?.message ||
          `Third-party API responded with status ${error.response.status}`;

        throw new AppError(message, error.response.status, {
          providerStatus: error.response.status,
          providerData: error.response.data,
        });
      }

      if (error.code === "ECONNABORTED") {
        throw new AppError("Third-party API request timed out", 504);
      }

      throw new AppError("Unable to reach third-party API", 502, {
        originalError: error.message,
      });
    }
  );

  return client;
};

module.exports = {
  weatherGeoClient: createApiClient("https://geocoding-api.open-meteo.com/v1"),
  weatherForecastClient: createApiClient("https://api.open-meteo.com/v1"),
};
