'use strict';

const { server } = require('../server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Web server', () => {
  it('should return a creation time', () => {
    return mockRequest
      .get('/a')
      .expect(200)
      .then(result => expect(result.body.reqTime).toBeDefined());
  });

  it('should log the method, path, and requestTime', () => {
    return mockRequest
      .get('/c')
      .expect(200)
      .expect({
        method: 'GET',
        path: '/b',
        reqTime: 'Added correctly',
      });
  });

  it('should raise an error on /d', () => {
    return mockRequest
      .get('/d')
      .expect(500);
  });

  it('should square a number on /b', () => {
    return mockRequest
      .get('/b')
      .expect({ number: 4 });
  });
});