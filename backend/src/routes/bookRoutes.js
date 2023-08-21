const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { bookValidationRules } = require('../validators/bookValidation');


router.get('/books', bookController.getBooks);
router.post('/books', bookValidationRules, bookController.createBook);

module.exports = router;
