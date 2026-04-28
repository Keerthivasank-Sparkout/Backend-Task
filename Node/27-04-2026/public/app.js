const socket = io();

let selectedUserId = null;

const nameInput = document.getElementById("name");
const roomInput = document.getElementById("room");
const joinBtn = document.getElementById("joinBtn");
const currentRoom = document.getElementById("currentRoom");
const newRoom = document.getElementById("newRoom");
const switchRoomBtn = document.getElementById("switchRoomBtn");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendRoomBtn = document.getElementById("sendRoomBtn");
const usersDiv = document.getElementById("users");
const privateText = document.getElementById("privateText");
const sendPrivateBtn = document.getElementById("sendPrivateBtn");
const selectedUser = document.getElementById("selectedUser");

function addMessage(text) {
  const p = document.createElement("p");
  p.textContent = text;
  messages.appendChild(p);
}

joinBtn.addEventListener("click", () => {
  socket.emit("join-chat", {
    name: nameInput.value,
    room: roomInput.value,
  });
});

switchRoomBtn.addEventListener("click", () => {
  socket.emit("switch-room", newRoom.value);
});

sendRoomBtn.addEventListener("click", () => {
  socket.emit("room-message", messageInput.value);
  messageInput.value = "";
});

sendPrivateBtn.addEventListener("click", () => {
  if (!selectedUserId) {
    addMessage("Select a user first for private message");
    return;
  }

  socket.emit("private-message", {
    to: selectedUserId,
    text: privateText.value,
  });
  privateText.value = "";
});

socket.on("joined", (user) => {
  currentRoom.textContent = user.room;
});

socket.on("room-message", (message) => {
  addMessage(`${message.sender}: ${message.text}`);
});

socket.on("private-message", (message) => {
  addMessage(`[Private] ${message.sender}: ${message.text}`);
});

socket.on("user-list", (users) => {
  usersDiv.innerHTML = "";

  users.forEach((user) => {
    const btn = document.createElement("button");
    btn.textContent = `${user.name} (${user.room})`;
    btn.addEventListener("click", () => {
      selectedUserId = user.id;
      selectedUser.textContent = `Selected user: ${user.name}`;
    });
    usersDiv.appendChild(btn);
  });
});
