const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

// Store users by socket id.
// Example:
// {
//   "socket-id": { id: "socket-id", name: "Kavin", room: "general" }
// }
const users = {};

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

function getOnlineUsers() {
  return Object.values(users);
}

function sendPresenceToEveryone() {
  chatNamespace.emit("presence", getOnlineUsers());
}

function buildMessage(sender, text, type = "room") {
  return {
    sender,
    text,
    type,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

// Namespace means this chat app uses /chat instead of the default / namespace.
// Client connection URL: io("/chat")
const chatNamespace = io.of("/chat");

chatNamespace.on("connection", (socket) => {
  console.log("User connected to /chat:", socket.id);

  socket.on("join-chat", ({ name, room }) => {
    const userName = String(name || "").trim();
    const roomName = String(room || "general").trim() || "general";

    if (!userName) {
      socket.emit("error-message", "Please enter your name");
      return;
    }

    users[socket.id] = {
      id: socket.id,
      name: userName,
      room: roomName,
    };

    socket.join(roomName);

    socket.emit("joined-chat", users[socket.id]);
    chatNamespace.to(roomName).emit(
      "room-message",
      buildMessage("System", `${userName} joined ${roomName}`, "system")
    );
    sendPresenceToEveryone();
  });

  socket.on("switch-room", (newRoom) => {
    const user = users[socket.id];
    const nextRoom = String(newRoom || "").trim();

    if (!user || !nextRoom) {
      return;
    }

    socket.leave(user.room);
    chatNamespace.to(user.room).emit(
      "room-message",
      buildMessage("System", `${user.name} left ${user.room}`, "system")
    );

    user.room = nextRoom;
    socket.join(nextRoom);

    socket.emit("joined-chat", user);
    chatNamespace.to(nextRoom).emit(
      "room-message",
      buildMessage("System", `${user.name} joined ${nextRoom}`, "system")
    );
    sendPresenceToEveryone();
  });

  socket.on("room-message", (text) => {
    const user = users[socket.id];
    const messageText = String(text || "").trim();

    if (!user || !messageText) {
      return;
    }

    chatNamespace.to(user.room).emit(
      "room-message",
      buildMessage(user.name, messageText)
    );
  });

  socket.on("private-message", ({ to, text }) => {
    const fromUser = users[socket.id];
    const toUser = users[to];
    const messageText = String(text || "").trim();

    if (!fromUser || !toUser || !messageText) {
      return;
    }

    socket.emit(
      "private-message",
      buildMessage(`You to ${toUser.name}`, messageText, "private")
    );

    chatNamespace.to(to).emit(
      "private-message",
      buildMessage(fromUser.name, messageText, "private")
    );
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];

    if (user) {
      chatNamespace.to(user.room).emit(
        "room-message",
        buildMessage("System", `${user.name} went offline`, "system")
      );
      delete users[socket.id];
      sendPresenceToEveryone();
    }

    console.log("User disconnected from /chat:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Chat app running at http://localhost:${PORT}`);
});
