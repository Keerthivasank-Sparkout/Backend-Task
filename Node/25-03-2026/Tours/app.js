const express = require('express')
const AppError = require('./utils/appError')
const ErrorHandler = require('./utils/errorHandler')
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const app = express();
app.set('query parser', 'extended');
// Third-party middleware
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(helmet());
//Build-in middleware
app.use(express.json())

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use((req,res,next)=>{
    next(new AppError(`can't find the ${req.originalUrl} in the server`,404));
})

app.use(ErrorHandler)

module.exports = app