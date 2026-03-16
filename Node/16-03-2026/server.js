const express = require("express");
const path = require("path");
const config = require("./config/config.js");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const mainRoutes = require("./routes/mainRoutes");
app.use("/", mainRoutes);

// Start Server
app.listen(config.port, () => {
  console.log(`Server running on ${config.baseUrl}`);
});