const express = require('express');
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");
const {TaskValidator} = require("../validations/validations.index");
const {TaskControllers} = require("../controllers/index.controllers");
const TaskRouter = express.Router();

TaskRouter.get('/all',auth,validate(TaskValidator.getTaskSchema),TaskControllers.getTasks);
TaskRouter.post('/create',auth,validate(TaskValidator.taskSchema),TaskControllers.createTask);
TaskRouter.patch('/update',auth,validate(TaskValidator.updateTaskSchema),TaskControllers.updateTask);
TaskRouter.delete('/delete',auth,validate(TaskValidator.deleteTaskSchema),TaskControllers.deleteTask);

module.exports = TaskRouter;