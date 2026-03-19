const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const tourRouter = require('./routes/tourRoutes')
// const userRouter = require('./routes/userRoutes')
const app = express();
// Third-party middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

//Build-in middleware
app.use(express.json())

app.use('/api/v1/tours',tourRouter);
// app.use('/api/v1/users',userRouter);


app.listen(3000, () => {
    console.log("server litening on port 3000")
})