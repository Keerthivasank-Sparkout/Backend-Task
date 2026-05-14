const mongoose = require('mongoose');

const User = require('../models/User');
const { verifyToken } = require('./tokenService');

const memoryUsers = new Map();

const isMongoConnected = () => mongoose.connection.readyState === 1;

const upsertUser = async ({ googleId, name, email, picture }) => {
  const userData = { googleId, name, email, picture };

  if (isMongoConnected()) {
    return User.findOneAndUpdate({ googleId }, userData, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
  }

  memoryUsers.set(googleId, { ...userData, id: googleId });
  return memoryUsers.get(googleId);
};

const findUserByEmail = async (email) => {
  if (isMongoConnected()) {
    return User.findOne({ email });
  }

  return [...memoryUsers.values()].find((user) => user.email === email) || null;
};

const findUserFromToken = async (token) => {
  const payload = verifyToken(token);
  return findUserByEmail(payload.email);
};

module.exports = {
  findUserFromToken,
  upsertUser,
};
