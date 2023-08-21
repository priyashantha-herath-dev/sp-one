const { body } = require('express-validator');
const Author = require('../models/Author');

const bookValidationRules = [
  body('name').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
  body('author').notEmpty().withMessage('Author is required').isMongoId().withMessage('Author must be a valid ID')
  .custom(async (value) => {
    const author = await Author.findById(value);
    return author? true : false;
  }).withMessage('Given author not found'),
  body('isbn').notEmpty().withMessage('ISBN is required').isISBN().withMessage('ISBN must be a valid ISBN'),
];

module.exports = {
    bookValidationRules,
};