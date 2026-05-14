const mongoose = require('mongoose');

const env = require('./env');

const connectDB = async () => {
  try {
    if (!env.mongodbUri) {
      console.log('MONGODB_URI not set; using in-memory user store');
      return;
    }

    await mongoose.connect(env.mongodbUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.warn('MongoDB connection failed; using in-memory user store:', error.message);
  }
};

module.exports = connectDB;
