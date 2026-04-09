const express = require("express");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1/books", bookRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});