'use strict';

const { server } = require('../server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Web server', () => {
  it('should throw an error of 500', () => {
    return mockRequest
      .get('/test/error')
      .expect(500);
  });

  it('should return a status of 404 and a message', () => {
    return mockRequest
      .get('/404')
      .expect(404);
  });
});