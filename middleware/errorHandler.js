'use strict';

module.exports = function(err, req, res, next) {
  console.error(err);
  next(err);
};