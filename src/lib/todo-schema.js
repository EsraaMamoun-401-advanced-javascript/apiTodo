'use strict';

const mongoose = require('mongoose');

const todo = mongoose.Schema({
  text: { type: String, required: true },
  assignee: { type: String, required: true },
  difficulty: { type: Number, default: 1 },
  complete: { type: Boolean, default: false },
});

const todoSchema = mongoose.model('todo', todo);

module.exports = todoSchema;