const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { authorValidationRules } = require('../validators/authorValidation');

router.post('/authors', authorValidationRules, authorController.createAuthor);
router.get('/authors', authorController.getAuthors);
router.get('/authors/:id', authorController.getAuthorById);

module.exports = router;
