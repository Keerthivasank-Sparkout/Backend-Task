const path = require('path');
const cors = require('cors');
const express = require('express');

const env = require('./config/env');
const appRoutes = require('./routes/appRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', appRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
