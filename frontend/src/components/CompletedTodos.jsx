import React from "react";
import TodoCard from "./TodoCard";
import "./css/CompletedTodos.css";

export default function CompletedTodos({ todos = [], onToggle, onDelete }) {
  const completed = todos.filter((todo) => todo.taskStatus === "Completed");

  if (!completed.length) {
    return <p>No completed todos</p>;
  }

  return (
    <div className="completed-container">
      <h1 className="page-title glow">Completed Todos</h1>
      <div className="completed-grid">
        {completed.map((todo, index) => (
          <div
            key={todo._id}
            className="todo-animate"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <TodoCard todo={todo} onToggle={onToggle} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}
