const express = require('express');
const cluster = require('node:cluster');
const app = express();
// if (cluster.isMaster) {
//     console.log(`master working ${process.pid}`)
//     cluster.fork()
//     cluster.fork()
// }
// else {
    // console.log(`worker perform ${process.pid}`)
    app.get('/', (req, res) => {
        res.status(200).send("home page")
    })
    app.get('/slow-page', (req, res) => {
        for (let i = 0; i <= 60000000000; i++) { }
        res.status(200).send("slow page")
    })
    app.listen(3000, () => {
        console.log("server running on post:3000")
    })

// }


