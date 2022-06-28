const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  changeCheckBoxCheck,
  changeTaskTextInfo,
  deleteTask
} = require('../controllers/task.controller');

router.get('/allTasks', getAllTasks);
router.post('/createTask', createNewTask);
router.patch('/updateCheckbox', changeCheckBoxCheck);
router.patch('/updateText', changeTaskTextInfo);
router.delete('/deleteTask', deleteTask);

module.exports = router;