const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../helpers/test-app');
const Author = require('../../src/models/Author');
const sinon = require('sinon');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Unit Tests for GET /authors/:id', function () {
  it('should return a detailed view of the specified author', async function () {
    // Create a sample author
    const authorData = { "first_name": 'John', "last_name": 'Doe' };
    const author = await new Author(authorData).save();

    const res = await chai.request(app).get(`/api/authors/${author._id}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('first_name', 'John');
    expect(res.body).to.have.property('last_name', 'Doe');
  });

  it('should handle author not found', async function () {
    // Create a non-existing author ID
    const nonExistingAuthorId = '606175f5a3f8ea7d58cde323';

    const res = await chai.request(app).get(`/api/authors/${nonExistingAuthorId}`);

    expect(res).to.have.status(404);
    expect(res.body).to.deep.equal({ error: 'Author not found' });
  });

  it('should handle internal server error', async function () {
    // Stub the Author.findById method to throw an error
    const findStub = sinon.stub(Author, 'findById').throws(new Error('Test error'));

    const res = await chai.request(app).get('/api/authors/123');

    expect(res).to.have.status(500);

    // Restore the stub to its original state
    findStub.restore();
  });
});
