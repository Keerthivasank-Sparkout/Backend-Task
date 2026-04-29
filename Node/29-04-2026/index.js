const express = require('express')
const cron = require('node-cron');
const app = express();
const task =()=>{
    console.log("Task At:", new Date().toUTCString());
}
cron.schedule("* * * * *",task)

app.listen(3000,()=>{
    console.log("server running at port:3000")
})