const jwt = require('jsonwebtoken');

const env = require('../config/env');

const sanitizeUser = (user) => ({
  id: user._id?.toString?.() || user.id || user.googleId,
  name: user.name,
  email: user.email,
  picture: user.picture,
});

const createToken = (user) =>
  jwt.sign(
    {
      sub: user._id?.toString?.() || user.googleId,
      email: user.email,
      name: user.name,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

module.exports = {
  createToken,
  sanitizeUser,
  verifyToken,
};
