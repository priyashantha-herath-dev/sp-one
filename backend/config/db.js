// config/db.js

require('dotenv').config(); 

const mongoose = require('mongoose');

const logger = require('./logger');


const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// Add event listeners for connection status and errors
db.on('connected', () => {
  logger.info('Connected to MongoDB');
});

db.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  logger.info('MongoDB disconnected');
});

module.exports = mongoose;
