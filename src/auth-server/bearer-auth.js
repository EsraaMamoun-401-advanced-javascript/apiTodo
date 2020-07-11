'use strict';

const Users = require('./users');

// const users = new Users();

module.exports = (req, res, next) => {
  if(!req.headers.authorization) {
    next('User is not loggedin');
    return;
  }

  console.log('req.headers.authorization:::: ', req.headers.authorization);
    
  let bearerToken = req.headers.authorization.split(' ').pop();

  Users.verifyToken(bearerToken) 
    .then(decodeUserObj => {
      console.log({decodeUserObj});
      req.users = decodeUserObj;
      next();
    }).catch(error => next('Protected: Invalid User Token'));
};
