const jwt = require('jsonwebtoken');
const User = require('../model');

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({
                status: 'Failed!!',
                message: "Authentication failed, Auth token missing Login again!!"
            })
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({
                status: 'Failed!!',
                message: "Authentication failed, Auth token missing Login again!!"
            })
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(400).json({
            status: 'Failed!!',
            message: "Authentication failed, Auth token missing Login again!!"
        })
    }

}