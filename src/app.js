const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
// ✅ Enable CORS for all origins
app.use(cors());

// Or to allow specific origin (more secure):
app.use(cors({
  origin: "http://localhost:5000" // replace with your frontend domain
}));

app.use(express.json());

// Add this line to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
const ambulanceRoutes = require("./routes/ambulance.routes.js");
const sosRoutes = require("./routes/sos.routes.js");
// Routes
app.use('/api', sosRoutes);
app.use("/api/ambulance", ambulanceRoutes);

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(`Stack: ${err.stack}`);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? {
      stack: err.stack,
      details: err.details || {}
    } : undefined
  });
});

module.exports = app;
