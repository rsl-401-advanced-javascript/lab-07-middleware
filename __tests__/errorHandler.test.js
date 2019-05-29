'use strict';

const { server } = require('../server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Error handler', () => {
  it('should throw an error when making a bad call', () => {
    return mockRequest
      .get('/test/error')
      .expect(500);
  });
});