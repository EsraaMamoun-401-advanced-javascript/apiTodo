'use strict';

const errorServer = (err, req, res, next) => {
  res.status(500);
  res.send(err);
  res.end();
};

module.exports = errorServer;