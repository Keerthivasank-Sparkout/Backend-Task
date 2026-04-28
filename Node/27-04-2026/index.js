const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;
const users = {};

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

function getOnlineUsers() {
  return Object.values(users).map((user) => ({
    id: user.id,
    name: user.name,
    room: user.room,
  }));
}

function sendUserList() {
  io.emit("user-list", getOnlineUsers());
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-chat", ({ name, room }) => {
    users[socket.id] = {
      id: socket.id,
      name: String(name || "").trim(),
      room: String(room || "general").trim() || "general",
    };

    socket.join(users[socket.id].room);
    socket.emit("joined", users[socket.id]);
    io.to(users[socket.id].room).emit("room-message", {
      sender: "System",
      text: `${users[socket.id].name} joined ${users[socket.id].room}`,
    });
    sendUserList();
  });

  socket.on("switch-room", (newRoom) => {
    const user = users[socket.id];
    if (!user) {
      return;
    }

    const roomName = String(newRoom || "").trim();
    if (!roomName) {
      return;
    }

    socket.leave(user.room);
    user.room = roomName;
    socket.join(roomName);

    socket.emit("joined", user);
    io.to(roomName).emit("room-message", {
      sender: "System",
      text: `${user.name} joined ${roomName}`,
    });
    sendUserList();
  });

  socket.on("room-message", (text) => {
    const user = users[socket.id];
    if (!user) {
      return;
    }

    io.to(user.room).emit("room-message", {
      sender: user.name,
      text: String(text || "").trim(),
    });
  });

  socket.on("private-message", ({ to, text }) => {
    const user = users[socket.id];
    if (!user || !users[to]) {
      return;
    }

    const message = {
      sender: user.name,
      text: String(text || "").trim(),
      private: true,
    };

    io.to(to).emit("private-message", message);
    socket.emit("private-message", {
      ...message,
      sender: `${user.name} to ${users[to].name}`,
    });
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit("room-message", {
        sender: "System",
        text: `${user.name} went offline`,
      });
      delete users[socket.id];
      sendUserList();
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
