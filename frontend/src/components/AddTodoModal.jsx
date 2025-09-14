import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  InputAdornment,
} from "@mui/material";
import { Title, Description, CalendarToday } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function AddTodoModal({ open, onClose, onAdd }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState(null);

  const handleAdd = () => {
    if (!taskName.trim()) return;

    onAdd({
      taskName,
      taskDescription: taskDescription || "No description",
      taskStatus: "Pending",
      deadline: deadline || null,
    });

    setTaskName("");
    setTaskDescription("");
    setDeadline(null);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            background: "linear-gradient(90deg, #8e2de2, #4a00e0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          Add New Todo
        </DialogTitle>

        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            autoFocus
            label="Todo Title"
            placeholder="Enter title"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Description"
            placeholder="Enter description"
            fullWidth
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <DatePicker
            label="Deadline"
            value={deadline}
            onChange={(newValue) => setDeadline(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday color="primary" sx={{ fontSize: 22 }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
          <Button onClick={onClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add Todo
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
