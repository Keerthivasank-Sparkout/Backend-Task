const express = require('express')
const multer = require('multer');
const path = require("path")


const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + ext;
        cb(null, uniqueName);
    },
})
const upload = multer({ 
    storage,
    limits:1*1024*1024
})

app.post('/upload/file', upload.single('file'), (req, res) => {
    res.status(200).json({
        status: "success!!",
        file: req.file
    })
})

app.post('/upload/files', upload.array('files', 10), (req, res) => {
    res.status(200).json({
        status: 'success!!',
        file: [req.files]
    })
})

app.listen(3000, () => {
    console.log("server running on port:3000");
})