import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AddTodoModal from "./AddTodoModal";
import { Outlet } from "react-router-dom";
import { createTask } from "../services/taskService";

export default function DashboardLayout() {
  const [openAdd, setOpenAdd] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const token = localStorage.getItem("token");
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const handleAddTask = async (task) => {
    try {
      const payload = user?._id ? { ...task, user: user._id } : { ...task };

      await createTask(payload, token);

      setOpenAdd(false);
      setRefreshKey((k) => k + 1);
    } catch (e) {
      console.error("Create task failed:", e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div style={{ width: 72, flex: "0 0 72px" }}>
        <Sidebar onOpenAdd={() => setOpenAdd(true)} />
      </div>

      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: "20px",
          overflow: "auto",
        }}
      >
        <Outlet context={{ refreshKey }} />
      </main>

      <AddTodoModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
}
