import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AllTodos from "../components/AllTodos";
import CompletedTodos from "../components/CompletedTodos";
import PendingTodos from "../components/PendingTodos";
import TodayTodos from "../components/TodayTodos";
import { getAllTasks, toggleTaskStatus } from "../services/taskService";

export default function Dashboard({ view = "all" }) {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");
  const { refreshKey } = useOutletContext() || { refreshKey: 0 };

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllTasks(token);
        setTodos(res?.data?.tasks ?? []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [token, refreshKey]);

  const handleToggle = async (id) => {
    try {
      const res = await toggleTaskStatus(id, token);
      const newStatus = res?.data?.task?.taskStatus;
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, taskStatus: newStatus } : t))
      );
    } catch (e) {
      console.error(e);
    }
  };


  switch (view) {
    case "completed":
      return <CompletedTodos todos={todos} onToggle={handleToggle} />;
    case "pending":
      return <PendingTodos todos={todos} onToggle={handleToggle} />;
    case "today":
      return <TodayTodos todos={todos} onToggle={handleToggle} />;
    default:
      return <AllTodos todos={todos} onToggle={handleToggle} />;
  }
}
