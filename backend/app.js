// app.js

require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('./config/db'); 
const logger = require('./config/logger');



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});