const logger = require('../../config/logger');
const authorService = require('../services/authorService');
const { validationResult } = require('express-validator');

exports.createAuthor = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a 400 Bad Request response with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    const authorData = req.body;
    const createdAuthor = await authorService.createAuthor(authorData);
    res.status(201).json(createdAuthor);
  } catch (error) {
    logger.error(`Internal server error while creating an author: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};
