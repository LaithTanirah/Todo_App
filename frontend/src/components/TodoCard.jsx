import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Divider,
  TextField,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { updateTask } from "../services/taskService"; // مسار دالة التحديث

export default function TodoCard({ todo, onToggle, onUpdate }) {
  const token = localStorage.getItem("token");
  const [hovered, setHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    taskName: todo.taskName,
    taskDescription: todo.taskDescription || "",
    taskStatus: todo.taskStatus,
    deadline: todo.deadline ? todo.deadline.slice(0, 10) : "",
  });

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await updateTask(todo._id, form, token);
      const updated = res?.data?.task;

      setIsEditing(false);
      onUpdate && onUpdate(updated); // ✅ هذا هو التحديث الفوري
    } catch (err) {
      console.error("Failed to update task:", err.message);
    }
  };

  const handleCancel = () => {
    setForm({
      taskName: todo.taskName,
      taskDescription: todo.taskDescription || "",
      taskStatus: todo.taskStatus,
      deadline: todo.deadline ? todo.deadline.slice(0, 10) : "",
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          mb: 2,
          borderRadius: "20px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-6px) scale(1.02)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            {isEditing ? (
              <TextField
                variant="standard"
                name="taskName"
                value={form.taskName}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textDecoration:
                    todo.taskStatus === "Completed" ? "line-through" : "none",
                  color: todo.taskStatus === "Completed" ? "gray" : "black",
                }}
              >
                {todo.taskName}
              </Typography>
            )}

            <div>
              {!isEditing && (
                <>
                  <Tooltip title="Toggle Status">
                    <IconButton onClick={() => onToggle(todo._id)}>
                      <CheckCircle
                        color={
                          todo.taskStatus === "Completed"
                            ? "success"
                            : "disabled"
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => setIsEditing(true)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}

              {isEditing && (
                <>
                  <Tooltip title="Save">
                    <IconButton onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <IconButton onClick={handleCancel}>
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </div>
          </div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={
              hovered || isEditing
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <Divider sx={{ my: 1 }} />

            {isEditing ? (
              <>
                <TextField
                  label="Description"
                  name="taskDescription"
                  value={form.taskDescription}
                  onChange={handleChange}
                  multiline
                  fullWidth
                  size="small"
                  margin="dense"
                />
                <TextField
                  label="Deadline"
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  select
                  label="Status"
                  name="taskStatus"
                  value={form.taskStatus}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="dense"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
              </>
            ) : (
              <>
                {todo.taskDescription && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {todo.taskDescription}
                  </Typography>
                )}

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  <strong>Created:</strong> {formatDate(todo.createdAt)}
                </Typography>
                {todo.deadline && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    <strong>Deadline:</strong> {formatDate(todo.deadline)}
                  </Typography>
                )}

                <Chip
                  label={todo.taskStatus}
                  color={
                    todo.taskStatus === "Completed"
                      ? "success"
                      : todo.taskStatus === "Pending"
                      ? "warning"
                      : "default"
                  }
                  size="small"
                  sx={{ mt: 1 }}
                />
              </>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
