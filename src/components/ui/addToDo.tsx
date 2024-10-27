import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Todo } from "../../types";

type AddToDoProps = {
  setTodos: (todos: Todo[]) => void;
  todos: Todo[];
};

function AddToDo({ setTodos, todos }: AddToDoProps) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentId, setCurrentId] = useState(
    todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
  );

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) setError(null); 
  };

  const handleChangeCompleted = (e: ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("The title cannot be empty.");       return;
    }

    const newToDo: Todo = {
      userId: 1,
      id: currentId,
      title: title,
      completed: completed,
    };

    const updatedTodos = [newToDo, ...todos];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setCurrentId((prevId) => prevId + 1);
    setTitle("");
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={handleChangeTitle}
          className={error ? "border-red-500" : ""}
        />
        <input
          title="Complete todo"
          type="checkbox"
          checked={completed}
          onChange={handleChangeCompleted}
        />

        <Button type="submit">Add ToDo</Button>
      </div>
      {error && <p className="text-red-500 mt-1">{error}</p>} 
    </form>
  );
}

export default AddToDo;
