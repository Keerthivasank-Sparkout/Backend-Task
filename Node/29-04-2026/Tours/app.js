const express = require('express')
const AppError = require('./utils/appError')
const ErrorHandler = require('./utils/errorHandler')
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const app = express();
app.use(express.json())
app.set('query parser', 'extended');
// Third-party middleware
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(helmet());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tours API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Tour: {
          type: "object",
          properties: {
            id: { type: "string", example: "662f2e8a6f6a4c0012a12345" },
            name: { type: "string", example: "The Forest Hiker" },
            duration: { type: "number", example: 5 },
            maxGroupSize: { type: "number", example: 25 },
            difficulty: { type: "string", example: "easy" },
            ratingsAverage: { type: "number", example: 4.7 },
            ratingsQuntity: { type: "number", example: 37 },
            price: { type: "number", example: 397 },
            priceDiscount: { type: "number", example: 50 },
            summary: { type: "string", example: "Breathtaking hike through the Canadian Banff National Park" },
            description: { type: "string", example: "A guided tour with beautiful trails and views." },
            imageCover: { type: "string", example: "tour-1-cover.jpg" },
            images: {
              type: "array",
              items: { type: "string" },
            },
            startDates: {
              type: "array",
              items: { type: "string", format: "date-time" },
            },
          },
        },
        TourInput: {
          type: "object",
          required: ["name", "duration", "maxGroupSize", "difficulty", "ratingsAverage", "price", "imageCover"],
          properties: {
            name: { type: "string", example: "The Forest Hiker" },
            duration: { type: "number", example: 5 },
            maxGroupSize: { type: "number", example: 25 },
            difficulty: { type: "string", example: "easy" },
            ratingsAverage: { type: "number", example: 4.7 },
            ratingsQuntity: { type: "number", example: 37 },
            price: { type: "number", example: 397 },
            priceDiscount: { type: "number", example: 50 },
            summary: { type: "string", example: "Breathtaking hike through the Canadian Banff National Park" },
            description: { type: "string", example: "A guided tour with beautiful trails and views." },
            imageCover: { type: "string", example: "tour-1-cover.jpg" },
            images: {
              type: "array",
              items: { type: "string" },
            },
            startDates: {
              type: "array",
              items: { type: "string", format: "date-time" },
            },
          },
        },
        UserInput: {
          type: "object",
          required: ["name", "email", "password", "confirmPass"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", example: "password123" },
            confirmPass: { type: "string", example: "password123" },
            role: { type: "string", enum: ["user", "guide", "lead-guide", "admin"], example: "user" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", example: "password123" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use((req,res,next)=>{
    next(new AppError(`can't find the ${req.originalUrl} in the server`,404));
})

app.use(ErrorHandler)

module.exports = app
