const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { authorValidationRules } = require('../validators/authorValidation');

router.post('/authors', authorValidationRules, authorController.createAuthor);

module.exports = router;
