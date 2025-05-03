const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());

// Configure CORS before other middleware
const allowedOrigins = [
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: false
}));



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
