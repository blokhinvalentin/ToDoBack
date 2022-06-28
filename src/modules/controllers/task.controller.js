const Task = require('../../models/task/task');

getAllTasks = (req, res) => {
  try { 
    Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(result => {
      res.send({ data: result });
    })
  }
  catch {
    res.status(400).send("cant get all tasks");
  }
};

createNewTask = (req, res) => {
  req.body.isCheck = false;
  const task = new Task(req.body);
  try { 
    task.save().then(() => {
      Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(allTasks => {
        res.send(allTasks);
      })
    });
  }
  catch {
    res.status(400).send("cant create task");
  }
};

changeCheckBoxCheck = (req, res) => {
  try {
    let [_id, isCheck] = [req.body._id, !req.body.isCheck];
    Task.updateOne({ _id, isCheck }, { isCheck: !isCheck }).then(() => {
      Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(allTasks => {
        res.send(allTasks);
      })
    });
  }
  catch {
    res.status(400).send("cant change checkbox");
  }
}

changeTaskTextInfo = (req, res) => {
  try {
    let [_id, text] = [req.body._id, req.body.text];
    Task.updateOne({ _id }, { text }).then(() => {
      Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(allTasks => {
        res.send(allTasks);
      })
    });
  }
  catch {
    res.status(400).send("cant change task");
  }
};

deleteTask = (req, res) => {
  try {
    Task.deleteOne({ _id: req.body._id }).then(() => {
      Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(allTasks => {
        res.send(allTasks);
      })
    });
  }
  catch {
    res.status(400).send("cant delete task");
  }
};

module.exports = {
  getAllTasks,
  createNewTask,
  changeCheckBoxCheck,
  changeTaskTextInfo,
  deleteTask
}