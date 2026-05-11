const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/../config.env` });
const Tour = require('../model/tourModel')
const fs = require('fs');

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB)
    .then(()=>console.log("MongoDB connected Successfully"))
    .catch((err)=>console.log(err.message))

const tour = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`,'utf-8'));
const importData = async ()=>{
    try{
        await Tour.create(tour)
        console.log("data successfully loaded")
        process.exit()

    }catch(err){
        console.log(err.message)
    }
}

const deleteData = async ()=>{
    try{
        await Tour.deleteMany()
        console.log("data successfully deleted")
        process.exit()

    }catch(err){
        console.log(err.message)
    }
}

if(process.argv[2] === '--import'){
    importData();
}
else if(process.argv[2] === '--delete'){
    deleteData();
}