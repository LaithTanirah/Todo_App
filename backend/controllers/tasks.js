const taskModel = require("../models/tasksSchema");

// Create a new task
const createTask = (req, res) => {
  const { taskName, taskDescription, taskStatus, deadline } = req.body;
  const { userId } = req.token;

  const newTask = new taskModel({
    taskName,
    taskDescription,
    taskStatus,
    deadline,
    user: userId,
  });

  newTask
    .save()
    .then((savedTask) => {
      res.status(201).json({
        success: true,
        message: "Task created successfully",
        taskInfo: savedTask,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong while creating the task",
        error: err.message,
      });
    });
};

// Get all tasks for the user
const getAllTasks = (req, res) => {
  const { userId } = req.token;

  taskModel
    .find({ user: userId })
    .populate("user")
    .then((tasks) => {
      if (tasks.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No tasks found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Tasks retrieved successfully",
        tasks,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching tasks",
        error: err.message,
      });
    });
};

const toggleTaskStatus = (req, res) => {
  const { userId } = req.token;
  const { taskId } = req.params;

  taskModel
    .findOne({ _id: taskId, user: userId })
    .then((task) => {
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found for this user",
        });
      }

      task.taskStatus = task.taskStatus === "Pending" ? "Completed" : "Pending";

      task
        .save()
        .then((updatedTask) => {
          res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            task: updatedTask,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Something went wrong while updating task status",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching the task",
        error: err.message,
      });
    });
};

const updateTask = (req, res) => {
  const { userId } = req.token;
  const { taskId } = req.params;
  const { taskName, taskDescription, taskStatus, deadline } = req.body;

  taskModel
    .findOne({ _id: taskId, user: userId })
    .then((task) => {
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found for this user",
        });
      }

      if (taskName !== undefined) task.taskName = taskName;
      if (taskDescription !== undefined) task.taskDescription = taskDescription;
      if (taskStatus !== undefined) task.taskStatus = taskStatus;
      if (deadline !== undefined) task.deadline = deadline;

      task
        .save()
        .then((updatedTask) => {
          res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Something went wrong while updating the task",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching the task",
        error: err.message,
      });
    });
};

const searchTasks = (req, res) => {
  const { userId } = req.token;
  const { query } = req.query;

  taskModel
    .find({
      user: userId,
      $or: [
        { taskName: { $regex: query, $options: "i" } },
        { taskStatus: { $regex: query, $options: "i" } },
      ],
    })
    .then((tasks) => {
      if (tasks.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No tasks matched your search",
        });
      }

      res.status(200).json({
        success: true,
        message: "Tasks found",
        tasks,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong while searching tasks",
        error: err.message,
      });
    });
};

module.exports = {
  createTask,
  getAllTasks,
  toggleTaskStatus,
  updateTask,
  searchTasks,
};
