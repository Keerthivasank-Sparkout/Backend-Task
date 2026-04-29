const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5174', 'http://127.0.0.1:5174'],
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send('Socket.IO message server is running');
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.emit('server-message', {
    text: 'Connected to Socket.IO server',
    sender: 'Server',
    time: new Date().toLocaleTimeString(),
  });

  socket.broadcast.emit('user-joined', {
    id: socket.id,
    time: new Date().toLocaleTimeString(),
  });

  socket.on('chat-message', (message) => {
    const payload = {
      id: socket.id,
      text: message.text,
      sender: message.sender || 'Guest',
      time: new Date().toLocaleTimeString(),
    };

    io.emit('chat-message', payload);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    socket.broadcast.emit('user-left', {
      id: socket.id,
      time: new Date().toLocaleTimeString(),
    });
  });
});

server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
