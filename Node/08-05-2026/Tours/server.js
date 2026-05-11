require('dotenv').config({ path: './config.env' })
const app = require('./app')
const mongoose = require('mongoose')

console.log(process.env.PORT)
const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB)
    .then(()=>console.log("MongoDB connected Successfully"))
    .catch((err)=>console.log(err.message))

app.listen(PORT, () => {
    console.log(`server running on port:${PORT}`)
}) 