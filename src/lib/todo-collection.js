'use strict';

const Model = require('./model');
const todoSchema = require('./todo-schema');

class Todo extends Model {
  constructor(schema) {
    super(schema);
  }
}

module.exports = new Todo(todoSchema);