const express = require("express");
const path = require("path");
const router = express.Router();
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
router.get("/about", (req, res) => {
  res.send("About Page");
});
router.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from API",
    status: "success"
  });
});

module.exports = router;