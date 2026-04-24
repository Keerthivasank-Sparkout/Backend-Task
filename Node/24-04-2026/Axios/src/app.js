const express = require("express");

const integrationRoutes = require("./routes/integrationRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFoundHandler = require("./middleware/notFoundHandler");

const app = express();

app.use(express.json());

app.use("/", integrationRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
