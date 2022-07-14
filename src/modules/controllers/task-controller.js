const Task = require('../../models/task');

const getAllTasks = (req, res) => {
  try { 
    Task.find().then(result => {
      res.status(200).send(result);
    })
  } catch (error) {
    res.status(400).send("cant get all tasks");
  }
};

const createNewTask = (req, res) => {
  const { text } = req.body;
  
  if (text === '') {
    throw new Error('text is empty');
  }
  
  const task = new Task({ text, isCheck: false });
  try { 
    task.save().then(() => {
      console.log(task);
      res.status(200).send(task);
    });
  } catch (error) {
    res.status(400).send("cant create task");
  }
};

const changeCheckBoxCheck = (req, res) => {
  try {
    const params = req.params;
    const [_id, isCheck] = [params._id, req.body.isCheck];

    if ((!params.hasOwnProperty('_id'))
      || (_id === '')
      || (typeof isCheck !== 'boolean')
    ) {
      throw new Error('id or checkbox are unreachable to read');
    }

    Task.findOneAndUpdate(
      { _id }, 
      { $set: { isCheck } },
      { new: true }
    ).then(result => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send("cant change checkbox");
  }
}

const changeTaskTextInfo = (req, res) => {
  try {
    const params = req.params;
    const [_id, text] = [params._id, req.body.text];

    if ((!params.hasOwnProperty('_id'))
      || (_id === '') 
      || (text === '')
    ) {
      throw new Error('id or text are unreachable to read');
    }

    Task.findOneAndUpdate(
      { _id },
      { $set: { text } },
      { new: true }
    ).then(result => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send("cant change task");
  }
};

const deleteTask = (req, res) => {
  try {
    const params = req.params;
    if (!params.hasOwnProperty('_id') || params._id === '') {
      throw new Error('id is unreachable to read');
    }

    const _id = params._id;

    Task.deleteOne({ _id }).then(result => {
      res.status(200).send(result);
    });
  } catch (error) {
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