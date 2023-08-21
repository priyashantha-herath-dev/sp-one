const { body } = require('express-validator');

const authorValidationRules = [
  body('first_name').isString().withMessage('First name must be a string').notEmpty().withMessage('First name is required'),
  body('last_name').isString().withMessage('Last name must be a string').notEmpty().withMessage('Last name is required'),
];

module.exports = {
  authorValidationRules,
};
