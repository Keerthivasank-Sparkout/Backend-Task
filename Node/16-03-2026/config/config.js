const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: 3000,
    baseUrl: "http://localhost:3000"
  },
  production: {
    port: 8080,
    baseUrl: "https://localhost:8080"
  }
};

module.exports = config[env];