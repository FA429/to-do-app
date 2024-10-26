import { useState, ChangeEvent, FormEvent } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Button } from "./components/ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "./components/ui/input";

type ToDo = {
  id: number;
  title: string;
  completed: boolean;
};

function AddToDo() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const [idCounter, setIdCounter] = useState(1);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeCompleted = (e: ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newToDo: ToDo = {
      id: idCounter,
      title: title,
      completed: completed,
    };

    setTodos([...todos, newToDo]);
    setIdCounter(idCounter + 1);
    setTitle("");
    setCompleted(false);
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
            type="text"
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={handleChangeTitle}
          />
      <input
        type="checkbox"
        checked={completed}
        onChange={handleChangeCompleted}
      />
     
     <Button
            type="submit"
          >
            Add ToDo
          </Button>
    </div>

      <div>
        <div className="container mx-auto p-4 italic ">
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <div className="blur-md invert brightness-150 md:filter-none">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Todo List
              </h1>
            </div>
            <div className="blur-none">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100 bg-opacity-50">
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todos.map((todo) => (
                      <TableRow
                        key={todo.id}
                        className="border-b border-gray-300 border-opacity-50"
                      >
                        <TableCell className="text-2xl">{todo.id}</TableCell>
                        <TableCell>{todo.title}</TableCell>
                        <TableCell>{todo.completed ? "✅" : "❌"}</TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to delete "{todo.title}
                                  "?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(todo.id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddToDo;

