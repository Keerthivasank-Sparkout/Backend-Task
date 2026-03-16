const fs = require("fs");
const crypto = require("crypto");

console.log("Start");

fs.readFile("test.txt", () => {
  console.log("File read completed");
});

crypto.pbkdf2("password","salt",100000,512,"sha512",()=>{
  console.log("Hash completed");
});

setTimeout(() => {
  console.log("Timer finished");
},0);

console.log("End");