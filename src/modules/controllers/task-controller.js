const Task = require('../../models/task');

const getAllTasks = (req, res) => {
  try { 
    Task.find().sort({ isCheck: 1 }).sort({ creationTime: -1 }).then(result => {
      res.status(200).send(result);
    })
  }
  catch(error) {
    res.status(400).send("cant get all tasks");
  }
};

const createNewTask = (req, res) => {
  const { text, creationTime } = req.body;

  if (text === '') {
    throw new Error('text is empty');
  }

  const task = new Task({ text, isCheck: false, creationTime });
  try { 
    task.save().then(() => {
      getAllTasks(req, res);
    });
  }
  catch(error) {
    res.status(400).send("cant create task");
  }
};

const changeCheckBoxCheck = (req, res) => {
  try {
    const { _id, isCheck } = req.body;

    if (!req.body.hasOwnProperty('_id') || typeof isCheck !== 'boolean') {
      throw new Error('id or checkbox are unreachable to read');
    }

    Task.updateOne(
      { _id }, 
      { $set: { _id, isCheck: isCheck } }
    ).then(() => {
      getAllTasks(req, res);
    });
  }
  catch(error) {
    res.status(400).send("cant change checkbox");
  }
}

const changeTaskTextInfo = (req, res) => {
  try {
    const { _id, text } = req.body;

    if (!req.body.hasOwnProperty('_id') || text === '') {
      throw new Error('id or text are unreachable to read');
    }

    Task.updateOne(
      { _id },
      { $set: { _id, text } }
    ).then(() => {
      getAllTasks(req, res);
    });
  }
  catch(error) {
    res.status(400).send("cant change task");
  }
};

const deleteTask = (req, res) => {
  try {
    if (!req.body.hasOwnProperty('_id')) {
      throw new Error('id is unreachable to read');
    }

    const _id = req.body._id;
    
    Task.deleteOne({ _id }).then(result => {
      res.status(200).send(result);
    });
  }
  catch(error) {
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