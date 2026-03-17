const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs')
const app = express();
// Third-party middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

//Build-in middleware
app.use(express.json())

const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
}
const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
}
const getTour = (req, res) => {
    const id = Number(req.params.id);
    if (id < 0 || isNaN(id)) {
        return res.status(404).json({
            status: "failed",
            message: "Enter valid Id"
        });
    }
    const tour = tours.find(item => item.id === id);
    if (!tour) {
        return res.status(404).json({
            status: "failed",
            message: "Tour not found"
        });
    }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    });
}
const updateTour = (req,res)=>{
    const id = req.params.id;
    if (id < 0 || isNaN(id)) {
        return res.status(404).json({
            status: "failed",
            message: "Enter valid Id"
        });
    }
    else{
        res.status(200).json({
        status: "success",
        message:"updated successfully"
    });
    }
}
const deleteTour = (req,res)=>{
    const id = req.params.id;
    if (id < 0 || isNaN(id)) {
        return res.status(404).json({
            status: "failed",
            message: "Enter valid Id"
        });
    }
    else{
        res.status(200).json({
        status: "success",
        message:"deleted successfully"
    });
    }
}
const getAllUsers = (req,res)=>{
    res.status(500).json({
        status:'success',
        message:"this route is not yet defind"
    })
}
const getUser = (req,res)=>{
    res.status(500).json({
        status:'success',
        message:"this route is not yet defind"
    })
}
const createUser = (req,res)=>{
    res.status(500).json({
        status:'success',
        message:"this route is not yet defind"
    })
}
const updateUser = (req,res)=>{
    res.status(500).json({
        status:'success',
        message:"this route is not yet defind"
    })
}
const deleteUser = (req,res)=>{
    res.status(500).json({
        status:'success',
        message:"this route is not yet defind"
    })
}

tourRouter.route('/').get(getAllTours).post(createTour)
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)
userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

app.listen(3000, () => {
    console.log("server litening on port 3000")
})