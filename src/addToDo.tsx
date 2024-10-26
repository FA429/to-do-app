import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

const AddToDo = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('Please enter a title for the todo.');
      return;
    }

    onAddTodo(title, completed);
    setTitle('');
    setCompleted(false);
  };

  return (
<form
  onSubmit={handleSubmit}
  className="flex flex-col items-center justify-center h-screen space-y-4"
>
  <Input
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

  );
};

export default AddToDo;
