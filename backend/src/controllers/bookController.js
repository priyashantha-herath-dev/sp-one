const logger = require('../../config/logger');
const bookService = require('../services/bookService');
const { validationResult } = require('express-validator');

exports.getBooks = async (req, res) => {
    try {
        // Define acceptable ranges for page and limit
        const minPage = 1;
        const maxLimit = 50; // Adjust this value to your needs

        // Parse query parameters
        const page = parseInt(req.query.page) || minPage;
        const limit = parseInt(req.query.limit) || maxLimit;

        // Ensure page is within an acceptable range
        if (page < minPage) {
        return res.status(400).json({ error: `Invalid 'page' value. Minimum value is ${minPage}.` });
        }

        // Ensure limit is within an acceptable range
        if (limit < 1 || limit > maxLimit) {
        return res.status(400).json({ error: `Invalid 'limit' value. It should be between 1 and ${maxLimit}.` });
        }
    
        const books = await bookService.getBooks(page, limit);
    
        const totalBooks = await bookService.getBookCount();
    
        // Calculate the total number of pages
        const totalPages = Math.ceil(totalBooks / limit);
    
        // Prepare the response
        const response = {
          books,
          currentPage: page,
          totalPages,
          totalBooks,
        };
    
        res.json(response);
      } catch (error) {
        logger.error(`Internal server error while get books: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
      }
};

exports.createBook = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a 400 Bad Request response with validation errors
      return res.status(400).json({ errors: errors.array() });
    }
    const bookData = req.body;
    const createdBook = await bookService.createBook(bookData);
    res.status(201).json(createdBook);
  } catch (error) {
    logger.error(`Internal server error while creating a book: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await bookService.getBookById(bookId);
    res.status(200).json(book);
  } catch (error) {
    logger.error(`Error while getting book by ID: ${error}`);
    if (error.message === 'Book not found') {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};