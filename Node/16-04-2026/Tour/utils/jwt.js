const jwt = require("jsonwebtoken");

const getJwtSecret = () => process.env.JWT_SECRET || process.env.NAME || "tour_jwt_secret";

exports.signToken = (payload) => {
    return jwt.sign(payload, getJwtSecret(), {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, getJwtSecret());
};
