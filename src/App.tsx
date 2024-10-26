import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import AddToDo from './AddToDo';
import './App.css';
import { Todo } from './types';
import { Button } from './components/ui/button';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
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
} from './components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 20;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddToDo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('Please enter a title for the todo.');
      return;
    }

    const newToDo: Todo = {
      id: todos.length + 1,
      title: title,
      completed: completed,
    };

    setTodos([newToDo, ...todos]); 
    setTitle('');
    setCompleted(false);
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
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
    <div className="background-image">


      <div className="container mx-auto p-4 italic mt-20">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Todo List</h1>
          <div className="overflow-x-auto">
          <form onSubmit={handleAddToDo} className="flex w-full max-w-sm items-center space-x-2">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="input"
        />
        <input
          type="checkbox"
          checked={completed}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCompleted(e.target.checked)}
        />
        <Button type="submit">Add ToDo</Button>
      </form>
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
                {currentTodos.map((todo) => (
                  <TableRow key={todo.id} className="border-b border-gray-300 border-opacity-50">
                    <TableCell>{todo.id}</TableCell>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.completed ? '✅' : '❌'}</TableCell>
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
                              Are you sure you want to delete "{todo.title}"?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(todo.id)}>
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

      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>
          Page {currentPage} of {Math.ceil(todos.length / todosPerPage)}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={nextPage}
          disabled={currentPage === Math.ceil(todos.length / todosPerPage)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
