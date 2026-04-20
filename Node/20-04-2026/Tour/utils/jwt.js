const jwt = require("jsonwebtoken");
const crypto = require('node:crypto');

exports.createAccessToken = (userId, role) => {
    return jwt.sign({
        userId,
        role
    },
        process.env.ACCESS_TOKEN_SECRET || 'access_token_secret',
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    )
}

exports.createRefreshToken = (userId, role) => {
    return jwt.sign({
        userId,
        role
    },
        process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret',
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}

exports.createCsrfToken = ()=>{
    return crypto.randomBytes(32).toString('hex');
}
