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