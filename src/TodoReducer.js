import React, { useReducer, useState } from "react";

// Define the initial state
const initialState = [];

// Define the reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

function TodoApp() {
  // useReducer hook
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  // Local state to handle input
  const [newTodo, setNewTodo] = useState("");

  // Handle form submission
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    dispatch({ type: "add", payload: newTodo });
    setNewTodo(""); // Clear input
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px", fontFamily: "Arial" }}>
      <h1>Todo App</h1>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      {/* Todo List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              padding: "10px",
              borderBottom: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "400px",
              margin: "0 auto",
            }}
          >
            <span
              onClick={() => dispatch({ type: "toggle", payload: todo.id })}
              style={{
                cursor: "pointer",
                flex: 1,
                textAlign: "left",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: "delete", payload: todo.id })}
              style={{
                padding: "5px 10px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;