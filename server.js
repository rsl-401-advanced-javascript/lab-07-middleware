'use strict';

const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const requestTimeMiddle = require('./middleware/requestTime');

const app = express();

app.use(requestTimeMiddle);

app.get('/a', (req,res) => {
  res.send({ reqTime: 'Added correctly' });
});

app.get('/b', (req,res) => {
  res.status(200).send('Route B');
});

app.get('/c', (req,res) => {
  res.status(200).send('Route C');
});

app.get('/d', (req,res) => {
  res.status(200).send('Route D');
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
