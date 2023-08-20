const request = require('supertest');
const express = require('express');
const app = require('../helpers/test-app');

describe('Server Setup', function() {
  let server;

  const PORT = process.env.TEST_PORT || 3000;

  before(function(done) {
    server = app.listen(PORT, function() {
      done();
    });
  });

  after(function(done) {
    server.close(function() {
      done();
    });
  });

  it(`should start the server and listen on port ${PORT}`, function(done) {
    request(server)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        else done();
      });
  });


});
