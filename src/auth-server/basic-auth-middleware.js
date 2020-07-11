'use strict';

const Users = require('./users');

module.exports = (req, res, next) => {

  let [auth, encoded] = req.headers.authorization.split(/\s+/);

  switch (auth.toLowerCase()) {
  case 'basic':
    return authBasic(encoded);
  default:
    break;
  }

  function authBasic(theAuth) {

    let base64Buffer = Buffer.from(theAuth, 'base64');
    let bufferString = base64Buffer.toString();
    let [username, password] = bufferString.split(':');
    let auth = { username, password };

    return Users.authenticateBasic(auth).then(user => {
      req.user = user;
      req.token = user.generateToken(user);
      next();
    });
  }
};