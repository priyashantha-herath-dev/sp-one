const Author = require('../models/Author');

exports.createAuthor = async (authorData) => {
  try {
    const newAuthor = new Author(authorData);
    
    const validationError = newAuthor.validateSync();
    if (validationError) {
      throw validationError;
    }

    return await newAuthor.save();
  } catch (error) {
    throw error; 
  }
};

exports.getAllAuthors = async () => {
  try {
    const authors = await Author.find();
    return authors;
  } catch (error) {
    throw error;
  }
};