const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  text: String,
  isCheck: Boolean,
  creationTime: Date
});

module.exports = Task = mongoose.model('Tasks', taskSchema);