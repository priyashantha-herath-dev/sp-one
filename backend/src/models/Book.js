const mongoose = require('mongoose');
const Author = require('./Author'); 

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);
