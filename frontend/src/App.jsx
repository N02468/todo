import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch all todos
  useEffect(() => {
    axios.get("http://localhost:4000/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);

  // Add a todo
  const addTodo = () => {
    if (text.trim()) {
      axios.post("http://localhost:4000/todos", { text }).then((response) => {
        setTodos([...todos, response.data]);
        setText("");
      });
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:4000/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text} <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;