import React from "react";
import TodoCard from "./TodoCard";
import "./css/PendingTodos.css";

export default function PendingTodos({
  todos = [],
  onToggle,
  onDelete,
  onUpdate,
}) {
  const pending = todos.filter((t) => t.taskStatus === "Pending");

  if (!pending.length) {
    return <p>No pending todos</p>;
  }

  return (
    <div className="pending-container">
      <h1 className="page-title glow">Pending Todos</h1>
      <div className="pending-grid">
        {pending.map((t, index) => (
          <div
            key={t._id}
            className="todo-animate"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <TodoCard
              todo={t}
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
