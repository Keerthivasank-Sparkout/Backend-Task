const development = require("./development");
const production = require("./production");

const env = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = env === "production" ? production : development;
