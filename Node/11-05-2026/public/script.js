// Connect to the /chat namespace.
const socket = io("/chat");

const loginPanel = document.getElementById("loginPanel");
const chatPanel = document.getElementById("chatPanel");
const loginForm = document.getElementById("loginForm");
const roomForm = document.getElementById("roomForm");
const messageForm = document.getElementById("messageForm");
const nameInput = document.getElementById("nameInput");
const roomInput = document.getElementById("roomInput");
const newRoomInput = document.getElementById("newRoomInput");
const currentRoom = document.getElementById("currentRoom");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const messageType = document.getElementById("messageType");
const privateUserSelect = document.getElementById("privateUserSelect");
const userList = document.getElementById("userList");

let myUser = null;
let onlineUsers = [];

function addMessage(message) {
  const messageBox = document.createElement("div");
  messageBox.className = `message ${message.type}`;

  const header = document.createElement("div");
  header.className = "message-header";

  const sender = document.createElement("strong");
  sender.textContent = message.sender;

  const time = document.createElement("span");
  time.textContent = message.time;

  const text = document.createElement("p");
  text.textContent = message.text;

  header.append(sender, time);
  messageBox.append(header, text);

  messages.appendChild(messageBox);
  messages.scrollTop = messages.scrollHeight;
}

function renderUsers() {
  userList.innerHTML = "";
  privateUserSelect.innerHTML = "";

  onlineUsers.forEach((user) => {
    const item = document.createElement("li");

    const dot = document.createElement("span");
    dot.className = "presence-dot";

    const name = document.createElement("span");
    name.textContent = user.name;

    const room = document.createElement("small");
    room.textContent = user.room;

    item.append(dot, name, room);
    userList.appendChild(item);

    if (myUser && user.id !== myUser.id) {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = `${user.name} (${user.room})`;
      privateUserSelect.appendChild(option);
    }
  });
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  socket.emit("join-chat", {
    name: nameInput.value,
    room: roomInput.value,
  });
});

roomForm.addEventListener("submit", (event) => {
  event.preventDefault();

  socket.emit("switch-room", newRoomInput.value);
  newRoomInput.value = "";
  messages.innerHTML = "";
});

messageType.addEventListener("change", () => {
  privateUserSelect.classList.toggle("hidden", messageType.value !== "private");
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (messageType.value === "private") {
    socket.emit("private-message", {
      to: privateUserSelect.value,
      text: messageInput.value,
    });
  } else {
    socket.emit("room-message", messageInput.value);
  }

  messageInput.value = "";
});

socket.on("joined-chat", (user) => {
  myUser = user;
  currentRoom.textContent = user.room;
  loginPanel.classList.add("hidden");
  chatPanel.classList.remove("hidden");
});

socket.on("presence", (users) => {
  onlineUsers = users;
  renderUsers();
});

socket.on("room-message", addMessage);
socket.on("private-message", addMessage);

socket.on("error-message", (message) => {
  alert(message);
});
