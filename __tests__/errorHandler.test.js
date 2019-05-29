'use strict';

const { server } = require('./server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);