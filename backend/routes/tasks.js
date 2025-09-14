const express = require("express");
const taskRouter = express.Router();

const {
  createTask,
  getAllTasks,
  toggleTaskStatus,
  updateTask,
  searchTasks,
} = require("../controllers/tasks");
const authentication = require("../middlewares/authentication");
taskRouter.post("/createTask", authentication, createTask);
taskRouter.get("/getAllTasks", authentication, getAllTasks);
taskRouter.put("/toggleStatus/:taskId", authentication, toggleTaskStatus);
taskRouter.put("/update/:taskId", authentication, updateTask);
taskRouter.get("/search", authentication, searchTasks);

module.exports = taskRouter;
