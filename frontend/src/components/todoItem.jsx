import { useState } from 'react';
import Button from './button';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleUpdate = () => {
    onUpdate(todo._id, { ...todo, title });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 border-b-2 border-primary focus:outline-none"
        />
      ) : (
        <p className="text-lg">{todo.title}</p>
      )}
      <div className="flex space-x-2">
        {isEditing ? (
          <Button onClick={handleUpdate}>Simpan</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
        <Button onClick={() => onDelete(todo._id)} secondary>
          Hapus
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;