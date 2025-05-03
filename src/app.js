const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const sosRoutes = require("./routes/sos.routes.js");
// Routes
app.use('/api', sosRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

module.exports = app;
