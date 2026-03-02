const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
console.log("Application is starting...");

function greet(name) {
  return `Hi, ${name}`;
}

console.log(greet("Keerthivasan"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});