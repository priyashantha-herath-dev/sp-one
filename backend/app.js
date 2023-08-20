// app.js

const express = require('express');
const app = express();

const mongoose = require('./config/db.js'); 
const logger = require('./config/logger.js');



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
