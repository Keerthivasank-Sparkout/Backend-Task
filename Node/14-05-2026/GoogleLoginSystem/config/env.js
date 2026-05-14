const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env.example'),
});

const port = process.env.PORT || 5000;
module.exports = {
  port,
  host: process.env.HOST || '127.0.0.1',
  clientOrigin: process.env.CLIENT_ORIGIN || `http://localhost:${port}`,
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  jwtSecret: process.env.JWT_SECRET || 'development-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  mongodbUri: process.env.MONGODB_URI || '',
};
