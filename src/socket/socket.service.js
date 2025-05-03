const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5000","http://localhost:3001", "https://rapid8.vercel.app", "http://127.0.0.1:5500"], // Add your frontend deployed URL here
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Handle joining ambulance tracking room
    socket.on("join-tracking", (ambulanceId) => {
      socket.join(`ambulance-${ambulanceId}`);
      console.log(`Socket ${socket.id} joined ambulance-${ambulanceId}`);
    });

    // Handle leaving tracking room
    socket.on("leave-tracking", (ambulanceId) => {
      socket.leave(`ambulance-${ambulanceId}`);
      console.log(`Socket ${socket.id} left ambulance-${ambulanceId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO
};
