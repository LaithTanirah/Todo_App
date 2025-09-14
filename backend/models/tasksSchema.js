const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    taskDescription: { type: String, required: true },
    taskStatus: { type: String, required: true, default: "Pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    deadline: { type: Date, required: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Task", taskSchema);
