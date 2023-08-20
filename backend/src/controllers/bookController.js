const logger = require('../../config/logger');
const bookService = require('../services/bookService');

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