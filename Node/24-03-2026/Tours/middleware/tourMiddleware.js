exports.checkId = (req,res,next)=>{
    const val = req.params.id;
    if (val < 0 || isNaN(val)) {
        return res.status(404).json({
            status: "failed",
            message: "Enter valid Id"
        });
    }
    next();
}