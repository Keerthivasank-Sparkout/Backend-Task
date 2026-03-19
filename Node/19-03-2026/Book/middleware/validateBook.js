module.exports = (req, res, next) => {
    const { title, author, price } = req.body;

    if (!title || !author || !price) {
        return res.status(400).json({
            status: "fail",
            message: "Title, author, and price are required"
        });
    }

    if (typeof price !== "number") {
        return res.status(400).json({
            status: "fail",
            message: "Price must be a number"
        });
    }

    next();
};