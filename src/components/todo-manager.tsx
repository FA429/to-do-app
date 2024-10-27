import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/ui/button";
import { Todos } from "./todos.tsx";
import { Todo } from "../types";
import "../App.css";
import AddToDo from "./ui/addToDo";
import { TaskProgress } from "./TaskProgress"; // استيراد دائرتي التقدم

export const TodoManager = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storageTodos = localStorage.getItem("todos");
    return storageTodos ? JSON.parse(storageTodos) : [];
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all"); // حالة الفلتر

  const todosPerPage = 20;

  // تطبيق الفلتر على المهام
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  useEffect(() => {
    if (todos.length === 0 && !isLoading) {
      setIsLoading(true);
      const fetchTodos = async () => {
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
          );
          if (!response.ok) throw new Error("Failed to fetch todos");

          const data: Todo[] = await response.json();
          setTodos(data);
          localStorage.setItem("todos", JSON.stringify(data));
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTodos();
    }
  }, [isLoading, todos.length]);

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredTodos.length / todosPerPage)) {
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
      <div className="container mx-auto p-4 italic">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Todo List</h1>
          <AddToDo setTodos={setTodos} todos={todos} />

          <div className="flex justify-between my-4">
            <Button
              className={`px-4 py-2 ${
                filter === "all" ? "bg-black text-white" : "bg-gray-300"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              className={`px-4 py-2 ${
                filter === "completed" ? "bg-green-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
            <Button
              className={`px-4 py-2 ${
                filter === "pending" ? "bg-red-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setFilter("pending")}
            >
                Unfinished
            </Button>
          </div>

          <TaskProgress todos={todos} />

          {error && <p className="text-red-500">{error}</p>}
          <div className="overflow-x-auto">
            <Todos todos={currentTodos} handleDelete={handleDelete} />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>
          Page {currentPage} of {Math.ceil(filteredTodos.length / todosPerPage)}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredTodos.length / todosPerPage)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
