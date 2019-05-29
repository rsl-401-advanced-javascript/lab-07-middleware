'use strict';

const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const requestTimeMiddle = require('./middleware/requestTime');
const methodPathTime = require('./middleware/methodPathTime');
const dRaiseError = require('./middleware/dRaiseError');

const app = express();

app.use(requestTimeMiddle);
app.use(methodPathTime);

app.get('/a', (req,res) => {
  res.send({ reqTime: req.requestTime });
});

app.get('/b', (req,res) => {
  res.send({ method: 'GET', path: '/b', reqTime: 'Added correctly'});
});

app.get('/c', (req,res) => {
  res.status(200).send('Route C');
});

app.use(dRaiseError);
app.get('/d', (req,res) => {
  throw Error;
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
