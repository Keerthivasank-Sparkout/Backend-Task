const mongoose = require('mongoose');

const env = require('../config/env');

const getConfig = (req, res) => {
  res.json({
    googleClientId: env.googleClientId,
  });
};

const getHealth = (req, res) => {
  res.json({
    status: 'ok',
    database:
      mongoose.connection.readyState === 1 ? 'connected' : 'not connected; using memory store',
  });
};

module.exports = {
  getConfig,
  getHealth,
};
