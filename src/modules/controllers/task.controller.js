const Task = require('../../db/models/task/index');

module.exports.getAllTasks = (req, res, next) => {
  Task.find().sort({ creationTime: -1 }).then(result => {
    res.send({ data: result });
  }).catch(err => console.error(err));
};

module.exports.createNewTask = (req, res, next) => {
  const task = new Task(req.body);
  task.save().then(result => {
    Task.find().sort({ creationTime: -1 }).then(result2 => {
      res.send(result2);
    }).catch(err => console.error(err));
  });
};

module.exports.changeTaskInfo = (req, res, next) => {
  Task.updateOne({ _id: req.body._id }, req.body).then(result1 => {
    Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(result => {
      res.send(result);
    });
  }).catch(err => console.error(err));
};

module.exports.deleteTask = (req, res, next) => {
  Task.deleteOne({ _id: req.body._id }).then(result => {
    Task.find().sort({ creationTime: -1 }).then(result2 => {
      res.send(result2);
    });
  }).catch(err => console.error(err));
};