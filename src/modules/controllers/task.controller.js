const Task = require('../../models/task/task');

getAllTasks = (req, res, next) => {
  try { 
    Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(result => {
      res.send({ data: result });
    })
  }
  catch {
    res.status(400).send("cant get all tasks");
  }
};

createNewTask = (req, res, next) => {
  const task = new Task(req.body);
  try { 
    task.save().then(result => {
      Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(allTasks => {
        res.send(allTasks);
      })
    })
  }
  catch {
    res.status(400).send("cant create task");
  }
};

changeTaskInfo = (req, res, next) => {
  try {
    Task.updateOne({ _id: req.body._id }, req.body).then(result => {
      Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(allTasks => {
        res.send(allTasks);
      });
    });
  }
  catch {
    res.status(400).send("cant change task");
  }
};

changeCheckBoxCheck = (req, res, next) => {
  try {
    Task.updateOne({ _id: req.body._id, isCheck: !req.body.isCheck }, req.body).then(result => {
      Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(allTasks => {
        res.send(allTasks);
      });
    });
  }
  catch {
    res.status(400).send("cant change checkbox");
  }
}

deleteTask = (req, res, next) => {
  try {
    Task.deleteOne({ _id: req.body._id }).then(result => {
      Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(allTasks => {
        res.send(allTasks);
      });
    })
  }
  catch {
    res.status(400).send("cant delete task");
  }
};

module.exports = {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  deleteTask
}