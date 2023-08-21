const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../helpers/test-app');
const bookService = require('../../src/services/bookService');
const sinon = require('sinon');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Unit Tests for POST /books', function () {
  it('should create a new book', async function () {
    // Mock bookService.createBook to return a dummy book
    const mockBook = {
      "name" : 'Modern Man in Search of a Soul',
      "author" : '64e2a874534e2a1b7cd69ad2', // todo: Needs to be replaced with dynamic author id
      "isbn" : '0-15-661206-2',
    };

    const createBookStub = sinon.stub(bookService, 'createBook').resolves(mockBook);

    const res = await chai.request(app).post('/api/books').send(mockBook);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.deep.equal(mockBook);

    // Restore the stub to its original state
    createBookStub.restore();
  });

  it('should handle validation errors', async function () {
    const invalidBook = {}; // This book is missing required fields

    const res = await chai.request(app).post('/api/books').send(invalidBook);

    expect(res).to.have.status(400);
    expect(res.body).to.be.an('object');
    expect(res.body.errors).to.be.an('array').that.is.not.empty;
  });

  it('should handle errors', async function () {
    // Stub the bookService.createBook method to throw an error
    const createBookStub = sinon.stub(bookService, 'createBook').throws(new Error('Test error'));

    const mockBook = {
        "name" : 'Modern Man in Search of a Soul',
        "author" : '64e2a874534e2a1b7cd69ad2', // todo: Needs to be replaced with dynamic author id
        "isbn" : '0-15-661206-2',
    };

    const res = await chai.request(app).post('/api/books').send(mockBook);

    expect(res).to.have.status(500);

    // Restore the stub to its original state
    createBookStub.restore();
  });
});
