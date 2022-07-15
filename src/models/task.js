const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  text: String,
  isCheck: Boolean,
  creationTime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Task = mongoose.model('Tasks', taskSchema);