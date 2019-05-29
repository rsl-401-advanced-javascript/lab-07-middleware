'use strict';

const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const requestTimeMiddle = require('./middleware/requestTime');
const methodPathTime = require('./middleware/methodPathTime');
const dRaiseError = require('./middleware/dRaiseError');
const square = require('./middleware/square');

const app = express();

app.use(requestTimeMiddle);
app.use(methodPathTime);

app.get('/a', (req,res) => {
  res.send({ reqTime: req.requestTime });
});

// app.use(square);
app.get('/b', square(2), (req,res) => {
  res.send({ number: req.number });
});

app.get('/c', (req,res) => {
  res.send({ method: 'GET', path: '/b', reqTime: 'Added correctly'});
});

app.get('/d', dRaiseError, (err, req, res) => {
  throw err;
});

app.use(errorHandler);
app.get('/test/error', (req, res) => {
  throw 'Test error!';
});

app.get('*', notFound, (req, res) => {
  res.status(404).send('Catch-all route');
});

module.exports = {
  server: app,
  start: port => {
    let PORT = process.env.PORT || port || 3000;
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}...`);
    });
  },
};
