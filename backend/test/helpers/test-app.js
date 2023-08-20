const express = require('express');
const app = express();

// Define a route for the root path
app.get('/', function(req, res) {
  res.status(200).send('Silence is golden!');
});

module.exports = app;
