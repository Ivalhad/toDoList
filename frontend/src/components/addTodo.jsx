import { useState } from 'react';
import Input from './input';
import Button from './button';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
      <Input
        type="text"
        placeholder="Tambah to-do baru..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit">Tambah</Button>
    </form>
  );
};

export default AddTodo;