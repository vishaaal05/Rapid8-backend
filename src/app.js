const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Configure CORS before other middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Add this line to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
const ambulanceRoutes = require("./routes/ambulance.routes.js");
const sosRoutes = require("./routes/sos.routes.js");
// Routes
app.use('/api', sosRoutes);
app.use("/api/ambulance", ambulanceRoutes);

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
