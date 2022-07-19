const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  changeCheckBoxCheck,
  changeTaskTextInfo,
  deleteTask
} = require('../controllers/task-controller');

router.get('/tasks', getAllTasks);
router.post('/tasks', createNewTask);
router.patch('/tasks/:_id/checkbox', changeCheckBoxCheck);
router.patch('/tasks/:_id/text', changeTaskTextInfo);
router.delete('/tasks/:_id', deleteTask);

module.exports = router;