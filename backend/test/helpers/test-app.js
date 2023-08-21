const express = require('express');
require('dotenv').config(); 

const mongoose = require('mongoose');
const app = express();
const bookRoutes = require('../../src/routes/bookRoutes');
const authorRoutes = require('../../src/routes/authorRoutes');

const dbURI = process.env.TEST_MONGODB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

// Define a route for the root path
app.get('/', function(req, res) {
  res.status(200).send('Silence is golden!');
});

app.use('/api', bookRoutes);
app.use('/api', authorRoutes);

module.exports = app;
