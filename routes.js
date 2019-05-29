'use strict';

const { Router, json } = require('express');
const dRaiseError = require('./middleware/dRaiseError');

const router = module.exports = new Router();

router.get('/c', (req,res) => {
  res.send({ method: 'GET', path: '/b', reqTime: 'Added correctly'});
});

router.get('/d', dRaiseError, (err, req, res) => {
  throw err;
});