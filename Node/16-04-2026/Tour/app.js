const path = require('path')
const dotenv = require('dotenv');
dotenv.config({  path: path.join(__dirname, '.env') })
const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./Routes/userRoute');
const app = express();

// Session-based setup:
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

app.use(express.json())

// Session-based setup:
// app.use(cookieParser("your mine"))
// app.use(session({
//     secret:"yourmine",
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         maxAge:60000 * 60
//     }
// }))

app.use('/api/v1/users',userRoutes)
const PORT = 3000;
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DB_PASSWORD);
mongoose.connect(DB)
    .then(()=>console.log("MongoDb connected successfully"))
    .catch((err)=>console.log(err))
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
})
