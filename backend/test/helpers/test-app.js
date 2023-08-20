const express = require('express');
const app = express();
const bookService = require('../../src/services/bookService');
const bookRoutes = require('../../src/routes/bookRoutes');

// Define a route for the root path
app.get('/', function(req, res) {
  res.status(200).send('Silence is golden!');
});

app.use('/api', bookRoutes);

module.exports = app;
