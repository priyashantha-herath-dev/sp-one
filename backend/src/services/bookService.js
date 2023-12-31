const Book = require('../models/Book');

exports.getBooks = async (page, limit) => {
    // Calculate skip value to skip items on previous pages
    const skip = (page - 1) * limit;

    return await Book.find()
      .skip(skip)
      .limit(limit);
};

exports.getBookCount = async () => {
    return await Book.countDocuments();
}

exports.createBook = async (bookData) => {
    try {
      const newBook = new Book(bookData);
  
      const validationError = newBook.validateSync();
      if (validationError) {
        throw validationError;
      }
  
      return await newBook.save();
    } catch (error) {
      throw error;
    }
};

// Function to get a book by ID, including author details
exports.getBookById = async (bookId) => {
  try {
    const book = await Book.findById(bookId).populate('author');
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  } catch (error) {
    throw error;
  }
};