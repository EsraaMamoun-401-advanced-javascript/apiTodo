'use strict';

const express = require('express');
const router = express.Router();

const todo = require('./todo-collection');

// const bearerMiddleware = require('../auth-server/bearer-auth');

// const permissions = require('../auth-server/acl-middleware');

function getModel(req, res, next) {

  let model = req.params.model;

  switch (model) {
  case 'todo':
    req.model = todo;
    next();
    return;
  default:
    next('Error: Invalid Model');
    return;
  }
}

router.param('model', getModel);

router.get('/:model', getAllFunction);
router.get('/:model/:id', getOneFunction);
router.post('/:model', postFunction);
router.put('/:model/:id', putFunction);
router.delete('/:model/:id', deleteFunction);

function getAllFunction(req, res, next) {
  req.model.get()
    .then(data => {
      let count = data.length;
      res.status(200).json({ count, data });
    }).catch(next);
}

function getOneFunction(req, res, next) {
  let id = req.params.id;
  req.model.get(id)
    .then(data => res.status(200).json(data))
    .catch(next);
}

function postFunction(req, res, next) {
  req.model.post(req.body)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function putFunction(req, res, next) {
  let id = req.params.id;
  req.model.update(id, req.body)
    .then(data => res.status(200).json(data))
    .catch(next);
}

function deleteFunction(req, res, next) {
  let id = req.params.id;
  req.model.delete(id)
    .then(data => {
      res.status(200).json(`This ${data.id} deleted successfully.`);
    }).catch(next);
}

module.exports = router;