import { useState } from 'react';
import Button from './button';
import Input from './input';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedItems, setEditedItems] = useState(todo.items);

  const handleItemTextChange = (index, newText) => {
    const newItems = editedItems.map((item, i) =>
      i === index ? { ...item, text: newText } : item
    );
    setEditedItems(newItems);
  };

  const handleAddNewItem = () => {
    setEditedItems([...editedItems, { text: '', completed: false }]);
  };

  const handleDeleteItem = (indexToDelete) => {
    setEditedItems(editedItems.filter((_, index) => index !== indexToDelete));
  };

  const handleSaveChanges = () => {
    const finalItems = editedItems.filter(item => item.text.trim() !== '');
    onUpdate(todo._id, { ...todo, title: editedTitle, items: finalItems });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(todo.title);
    setEditedItems(todo.items);
    setIsEditing(false);
  };

  const handleToggleItem = (itemIndex) => {
    const updatedItems = todo.items.map((item, index) =>
      index === itemIndex ? { ...item, completed: !item.completed } : item
    );
    onUpdate(todo._id, { ...todo, items: updatedItems });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {isEditing ? (
        <div className="space-y-4">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Edit Judul Utama"
            className="font-bold text-lg"
          />
          <div className="space-y-2">
            {editedItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={item.text}
                  onChange={(e) => handleItemTextChange(index, e.target.value)}
                  placeholder={`Edit sub-tugas...`}
                />
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="text-red-500 hover:text-red-700 font-bold text-xl"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <Button onClick={handleAddNewItem} type="button" fullWidth variant="secondary">+ Tambah Item</Button>
          <div className="flex gap-2 justify-end mt-4">
            <Button onClick={handleCancelEdit} variant="danger">Batal</Button>
            <Button onClick={handleSaveChanges}>Simpan</Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800">{todo.title}</h3>
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
              <Button onClick={() => onDelete(todo._id)} variant="danger">
                Hapus
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {todo.items.map((item, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggleItem(index)}
                  className="h-5 w-5 rounded text-blue-500 focus:ring-blue-400"
                />
                <span className={`ml-3 text-gray-700 ${item.completed ? 'line-through text-gray-400' : ''}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;