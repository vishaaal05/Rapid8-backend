const express = require("express");
const cors = require("cors");
const path = require("path");
const ambulanceRoutes = require("./routes/ambulance.routes.js");
const sosRoutes = require("./routes/sos.routes.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:3001",
  "http://127.0.0.1:5500",
  "https://rapid8.vercel.app",
  // Allow Postman requests
  "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Origin blocked:', origin); // Add logging
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api', sosRoutes);
app.use("/api/ambulance", ambulanceRoutes);

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
