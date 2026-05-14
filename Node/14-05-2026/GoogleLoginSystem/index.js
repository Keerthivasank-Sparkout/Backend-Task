const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

const startServer = async () => {
  await connectDB();

  const server = app.listen(env.port, env.host, () => {
    console.log(`Google login app running at http://${env.host}:${env.port}`);
  });

  server.on('error', (error) => {
    console.error('Server failed to start:', error.message);
    process.exit(1);
  });
};

startServer();
