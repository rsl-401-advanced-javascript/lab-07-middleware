'use strict';

module.exports = function(number) {
  return function(req, res, next) {
    req.number = number * number;

    next();
  };
};
