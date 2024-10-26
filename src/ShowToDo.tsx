import React from 'react';
import { Button } from './components/ui/button';
import { Trash2 } from 'lucide-react';
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

const ShowToDo = ({ todos, onDeleteTodo }) => {
  return (
    <div className="container mx-auto p-4 italic">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Todo List</h1>
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
                          <AlertDialogAction onClick={() => onDeleteTodo(todo.id)}>
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
  );
};

export default ShowToDo;
