const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../helpers/test-app'); 
const bookService = require('../../src/services/bookService');
const sinon = require("sinon");

chai.use(chaiHttp);
const expect = chai.expect;

describe('Unit testing /api/books', function () {
  it('should return an array of books', async function () {
    // Mock bookService.getBooks to return dummy data
    const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }];
    const getBooksStub = sinon.stub(bookService, 'getBooks').resolves(mockBooks);

    const res = await chai.request(app).get('/api/books');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.books).to.be.an('array');
    expect(res.body.books).to.deep.equal(mockBooks);

    getBooksStub.restore(); // Restore the stub to its original state
  });
});
