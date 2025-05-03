const express = require("express");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");
const ambulanceRoutes = require("./routes/ambulance.routes.js");
const sosRoutes = require("./routes/sos.routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added this line

const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:3001",
  "http://127.0.0.1:5500",
  "https://rapid8.vercel.app", // Add your frontend deployed URL here
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],     // Add allowed headers
  credentials: true  // Enable if you're using cookies/authentication
}));

// Add this line to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket connection handler
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("join-ambulance-tracking", (ambulanceId) => {
    socket.join(`ambulance-${ambulanceId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

//   socket.on("join-ambulance-tracking", (ambulanceId) => {
//     socket.join(`ambulance-${ambulanceId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// Make io accessible to our routes
app.set("io", io);

// Change module.exports to export server instead of app
module.exports = server;
