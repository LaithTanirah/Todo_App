import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircle } from "@mui/icons-material";

export default function TodoCard({ todo, onToggle }) {
  const [hovered, setHovered] = useState(false);

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
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textDecoration:
                  todo.taskStatus === "Completed" ? "line-through" : "none",
                transition: "color 0.3s",
                color: todo.taskStatus === "Completed" ? "gray" : "black",
              }}
            >
              {todo.taskName}
            </Typography>

            <IconButton onClick={() => onToggle(todo._id)}>
              <CheckCircle
                color={todo.taskStatus === "Completed" ? "success" : "disabled"}
              />
            </IconButton>
          </div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={
              hovered
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <Divider sx={{ my: 1 }} />

            {todo.taskDescription && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
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
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
