const express = require('express')
const AppError = require('./utils/appError')
const ErrorHandler = require('./utils/errorHandler')
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerDocJs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes');
const app = express();
app.use(express.json())
app.set('query parser', 'extended');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Backend Api's for Tour service",
            version: '1.0.0'
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./controller/*.js', './routes/*.js']

}
const swaggerSpec = swaggerDocJs(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Third-party middleware
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(helmet());


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use((req, res, next) => {
    next(new AppError(`can't find the ${req.originalUrl} in the server`, 404));
})

app.use(ErrorHandler)

module.exports = app