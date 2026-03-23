const express = require('express')
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

module.exports = app