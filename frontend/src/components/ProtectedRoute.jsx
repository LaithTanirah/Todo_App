import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let user = null;
  let token = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
    token = localStorage.getItem("token");
  } catch (err) {
    console.error("Invalid user data in localStorage", err);
  }

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
