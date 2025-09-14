import React from "react";
import TodoCard from "./TodoCard";
import "./css/AllTodos.css";

export default function AllTodos({ todos = [], onToggle, onDelete, onUpdate }) {
  if (!Array.isArray(todos)) return <p>No todos available</p>;
  if (todos.length === 0) return <p>No todos available</p>;

  return (
    <div className="todos-container">
      <h1 className="page-title glow">My Todo List</h1>
      <div className="todos-grid">
        {todos.map((todo, index) => (
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
