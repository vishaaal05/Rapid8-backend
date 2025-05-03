require("dotenv").config();
const app = require("./app");
const http = require("http");
const connectDB = require("./config/db");
const { initializeSocket } = require("./socket/socket.service");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
