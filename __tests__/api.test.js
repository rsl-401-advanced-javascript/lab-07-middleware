'use strict';

const { server } = require('../server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Web server', () => {
  it('should return a creation time', () => {
    return mockRequest
      .get('/a')
      .expect(200)
      .expect({ reqTime: 'Added correctly' });
  });
});