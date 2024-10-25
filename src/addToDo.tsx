import React, { useEffect, useState } from "react";
import { Todo } from "./types";

const AddToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); 
  const [error, setError] = useState<string | null>(null); 
  const [currentPage, setCurrentPage] = useState<number>(1); 

  const todosPerPage = 20; 

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const storageTodos = localStorage.getItem("todos");
    if (storageTodos) {
      setTodos(JSON.parse(storageTodos));
    } else {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  
  const nextPage = () => {
    if (currentPage < Math.ceil(todos.length / todosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {currentTodos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> - {todo.completed ? "✅" : "❌"}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(todos.length / todosPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(todos.length / todosPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddToDo;
