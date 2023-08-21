const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../helpers/test-app');
const Book = require('../../src/models/Book');
const Author = require('../../src/models/Author');
const sinon = require('sinon');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Unit Tests for GET /books/:id', function () {
  it('should return a detailed view of the specified book', async function () {
    // Create a sample author
    const authorData = { "first_name": 'John', "last_name": 'Doe' };
    const author = await new Author(authorData).save();

    // Create a sample book with the author's ID
    const bookData = { "name": 'Sample Book', "author": author._id, "isbn": '0-15-661206-2' };
    const book = await new Book(bookData).save();

    const res = await chai.request(app).get(`/api/books/${book._id}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('name', 'Sample Book');
    expect(res.body).to.have.property('isbn', '0-15-661206-2');
    expect(res.body).to.have.property('author');
    expect(res.body.author).to.have.property('first_name', 'John');
    expect(res.body.author).to.have.property('last_name', 'Doe');
  });

  it('should handle book not found', async function () {
    // Create a non-existing book ID
    const nonExistingBookId = '606175f5a3f8ea7d58cde323';

    const res = await chai.request(app).get(`/api/books/${nonExistingBookId}`);

    expect(res).to.have.status(404);
    expect(res.body).to.deep.equal({ error: 'Book not found' });
  });

  it('should handle internal server error', async function () {
    // Stub the Book.findById method to throw an error
    const findStub = sinon.stub(Book, 'findById').throws(new Error('Test error'));

    const res = await chai.request(app).get('/api/books/123');

    expect(res).to.have.status(500);

    // Restore the stub to its original state
    findStub.restore();
  });
});
