require('dotenv').config(); 
const assert = require('chai').assert;
const mongoose = require('mongoose');

const testDbURI = process.env.TEST_MONGODB_URI;

describe('Database Connection', function() {
  it('should connect to the database', function(done) {
    mongoose.connect(testDbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
      assert.equal(mongoose.connection.readyState, 1); // 1 means connected
      done();
    }).catch(err => {
      done(err);
    });
  });
});
