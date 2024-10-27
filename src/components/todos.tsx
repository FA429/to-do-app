import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./ui/ui/table"
  import { Todo } from "../types"
import { Button } from "./ui/ui/button"
import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
  
  type TodosProps = {
    todos: Todo[]
    handleDelete: (id: number) => void
  }
  
  export const Todos = ({ todos, handleDelete }: TodosProps) => {
    return (
<div className="table">



    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {todos.map((todo) => (
        <TableRow key={todo.id}>
          <TableCell>{todo.id}</TableCell>
          <TableCell>{todo.title}</TableCell>
          <TableCell>{todo.completed ? '✅' : '❌'}</TableCell>
          <TableCell>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete "{todo.title}"?
                  </AlertDialogTitle>
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
    )
  }
  