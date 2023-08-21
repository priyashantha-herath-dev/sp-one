const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../helpers/test-app');
const Author = require('../../src/models/Author');
const sinon = require('sinon');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Unit Tests for GET /authors', function () {
  it('should return a list of authors', async function () {
    // Create some sample authors for the test
    const sampleAuthors = [
      { first_name: 'John', last_name: 'Doe' },
      { first_name: 'Jane', last_name: 'Smith' },
    ];

    // Stub the Author.find method to return the sample authors
    const findStub = sinon.stub(Author, 'find').resolves(sampleAuthors);

    const res = await chai.request(app).get('/api/authors');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.deep.equal(sampleAuthors);

    // Restore the stub to its original state
    findStub.restore();
  });

  it('should handle errors', async function () {
    // Stub the Author.find method to throw an error
    const findStub = sinon.stub(Author, 'find').throws(new Error('Test error'));

    const res = await chai.request(app).get('/api/authors');

    expect(res).to.have.status(500);

    // Restore the stub to its original state
    findStub.restore();
  });
});
