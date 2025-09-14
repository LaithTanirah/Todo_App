import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        tab === 0
          ? "http://localhost:5000/users/login"
          : "http://localhost:5000/users/register";

      const body =
        tab === 0
          ? { email: formData.email, password: formData.password }
          : formData;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setToast({ open: true, message: data.message, severity: "success" });

      if (tab === 0 && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userInfo[0].userName));
        console.log(data.userInfo[0].userName);

        setTimeout(() => (window.location.href = "/dashboard"), 1000);
      }
    } catch (err) {
      setToast({ open: true, message: err.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2 }}
          style={{
            width: "150%",
            height: "150%",
            background:
              "radial-gradient(circle at 30% 30%, rgb(173, 153, 248), transparent 70%), radial-gradient(circle at 70% 70%, rgba(76, 0, 255, 0.4), transparent 70%)",
            filter: "blur(120px)",
            position: "absolute",
            top: "-25%",
            left: "-25%",
          }}
        />
      </Box>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ zIndex: 2 }}
      >
        <Paper
          elevation={10}
          sx={{
            width: 400,
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(15px)",
            background: "rgba(45, 44, 48, 0.7)",
          }}
        >
          <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 3 }}
          >
            <Tab label="Login" sx={{ color: "white" }} />
            <Tab label="Register" sx={{ color: "white" }} />
          </Tabs>

          <motion.form
            key={tab}
            initial={{ opacity: 0, x: tab === 0 ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
          >
            {tab === 1 && (
              <TextField
                fullWidth
                label="Full Name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
            )}

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 3,
                background:
                  "linear-gradient(90deg, #06b6d4 0%, #3b82f6 50%, #9333ea 100%)",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : tab === 0 ? (
                "Login"
              ) : (
                "Register"
              )}
            </Button>
          </motion.form>
        </Paper>
      </motion.div>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
