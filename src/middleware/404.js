'use strict';

const notFound = (req, res, next) => {
  res.status(404);
  res.send('NOT FOUND !!!');
  res.end();
};

module.exports = notFound;