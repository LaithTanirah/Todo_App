import React from "react";
import TodoCard from "./TodoCard";
import "./css/TodayTodos.css";

const toLocalDay = (d) => {
  try {
    const dt = new Date(d);
    if (isNaN(dt)) return null;
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();
  } catch {
    return null;
  }
};

export default function TodayTodos({
  todos = [],
  onToggle,
  onDelete,
  onUpdate,
}) {
  const now = new Date();
  const todayKey = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();

  const todaysTodos = todos.filter((t, i) => {
    const key =
      (t.deadline && toLocalDay(t.deadline)) ??
      (t.createdAt && toLocalDay(t.createdAt));

    return key === todayKey;
  });

  if (!todaysTodos.length) {
    return <p>No todos for today</p>;
  }

  return (
    <div className="today-container">
      <h1 className="page-title glow">Today&apos;s Todos</h1>
      <div className="today-grid">
        {todaysTodos.map((todo, index) => (
          <div
            key={todo._id}
            className="todo-animate"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <TodoCard
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
