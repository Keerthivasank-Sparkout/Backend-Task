const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Socket.IO server is running",
  });
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.emit("welcome", {
    message: "Welcome to the Socket.IO server",
    socketId: socket.id,
  });

  socket.on("chat-message", (data) => {
    console.log("Received message:", data);

    io.emit("chat-message", {
      senderId: socket.id,
      text: data.text,
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
