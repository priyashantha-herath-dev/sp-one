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

exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await authorService.getAuthorById(authorId);
    res.status(200).json(author);
  } catch (error) {
    logger.error(`Error while getting author by ID: ${error}`);
    if (error.message === 'Author not found') {
      res.status(404).json({ error: 'Author not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};