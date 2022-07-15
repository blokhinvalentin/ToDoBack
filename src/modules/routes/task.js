const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  changeCheckBoxCheck,
  changeTaskTextInfo,
  deleteTask
} = require('../controllers/task-controller');

router.get('/allTasks', getAllTasks);
router.post('/createTask', createNewTask);
router.patch('/updateCheckbox/:_id', changeCheckBoxCheck);
router.patch('/updateText/:_id', changeTaskTextInfo);
router.delete('/deleteTask/:_id', deleteTask);

module.exports = router;