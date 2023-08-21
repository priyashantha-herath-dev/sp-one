const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../helpers/test-app');
const authorService = require('../../src/services/authorService');
const sinon = require('sinon');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Unit Tests for POST /authors', function () {
  it('should create a new author', async function () {
    // Mock authorService.createAuthor to return a dummy author
    const mockAuthor = { "first_name" : 'John', "last_name" : 'Doe' };
    const createAuthorStub = sinon.stub(authorService, 'createAuthor').resolves(mockAuthor);

    const res = await chai.request(app)
      .post('/api/authors')
      .send(mockAuthor);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.deep.equal(mockAuthor);

    createAuthorStub.restore(); // Restore the stub to its original state
  });
});
