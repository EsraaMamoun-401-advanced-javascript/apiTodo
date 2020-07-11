'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const apiV1Router = require('./lib/v1');
const notFound = require('./middleware/404');
const errorServer = require('./middleware/500');

const Users = require('./auth-server/users');
const basicAuth = require('./auth-server/basic-auth-middleware');

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.status(200).send('Welcome!!');
});

let roles = {
  user: ['read'],
  writer: ['read', 'update'],
  editor: ['read', 'update', 'create'],
  admin: ['read', 'update', 'create', 'delete'],
};

app.post('/signup', (req, res, next) => {
  let user = req.body;
  let users = new Users(user);
  users.save()
    .then(result => {
      let uerRoles = roles[result.role];
      let token = users.generateToken(result);
      res.cookie('token', token, { expires: new Date(Date.now() + 12000000), httpOnly: false });
      res.status(200).json({ userData: result, token, uerRoles });
    }).catch(error => {
      console.error(`Error: invalid signup username is taken`);
      res.status(403).send('invalid signup username is taken');
    });
});

app.post('/signin', basicAuth, (req, res) => {
  let token = req.token;
  let uerRoles = roles[req.user.role];
  console.log('uerRoles===', uerRoles);
  res.cookie('token', token, { expires: new Date(Date.now() + 12000000), httpOnly: false });

  res.status(201).send({ token, userData: req.user, uerRoles });
});

app.get('/users', (req, res) => {
  Users.list()
    .then(results => {
      res.status(200).json(results);
    });
});

app.use(apiV1Router);
app.use('*', notFound);
app.use(errorServer);

module.exports = {
  server: app,
  start: port => {
    let PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`My app is up and running on ${PORT}`));
  },
};