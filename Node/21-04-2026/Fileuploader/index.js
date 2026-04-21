require("dotenv").config();
const sharp = require('sharp')
const express = require("express");
const multer = require("multer");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const app = express();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, PDF files allowed"), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024 // 1MB
  },
  fileFilter
});

const uploadToS3 = async (file) => {
  const fileExt = path.extname(file.originalname);
  const fileName = `${Date.now()}${fileExt}`;
  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype
  }));
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};


// Single file upload
app.post("/upload/file", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    //const processed = await sharp(req.file.buffer).resize(300,300).jpeg({quality:80}).toBuffer()

    const url = await uploadToS3(req.file);

    res.status(200).json({
      status: "success",
      url
    });

  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message
    });
  }
});


// Multiple file upload
app.post("/upload/files", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const urls = [];

    for (const file of req.files) {
      const url = await uploadToS3(file);
      urls.push(url);
    }

    res.status(200).json({
      status: "success",
      files: urls
    });

  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message
    });
  }
});


app.use((err, req, res, next) => {

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        status: "failed",
        error: "File too large (max 1MB)"
      });
    }

    return res.status(400).json({
      status: "failed",
      error: err.message
    });
  }

  res.status(500).json({
    status: "error",
    error: err.message
  });
});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});