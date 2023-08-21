// app.js

require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('./config/db'); 
const logger = require('./config/logger');

const bookRoutes = require('./src/routes/bookRoutes');
const authorRoutes = require('./src/routes/authorRoutes');

app.use(express.json());

// routes
app.use('/api', bookRoutes);
app.use('/api', authorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});