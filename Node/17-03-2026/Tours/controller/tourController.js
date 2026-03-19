const fs = require('fs')
console.log(`${__dirname}/../dev-data/data/tours-simple.json`)
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
}
exports.createTour = (req, res) => {
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
exports.getTour = (req, res) => {
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
exports.updateTour = (req,res)=>{
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
exports.deleteTour = (req,res)=>{
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