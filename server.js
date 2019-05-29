'use strict';

const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

const PORT = process.env.PORT || 8080;


app.get('/a', (req,res) => {
  res.status(200).send('Route A');
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
