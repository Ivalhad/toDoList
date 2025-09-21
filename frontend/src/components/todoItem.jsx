import Button from './button';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  // Fungsi untuk menangani perubahan status 'completed' pada sub-item
  const handleToggleItem = (itemIndex) => {
    const updatedItems = todo.items.map((item, index) =>
      index === itemIndex ? { ...item, completed: !item.completed } : item
    );
    onUpdate(todo._id, { ...todo, items: updatedItems });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">{todo.title}</h3>
        <Button onClick={() => onDelete(todo._id)} secondary>
          Hapus
        </Button>
      </div>

      {/* Daftar sub-tugas (items) */}
      <div className="mt-4 space-y-2">
        {todo.items.map((item, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleItem(index)}
              className="h-5 w-5 rounded text-blue-500 focus:ring-blue-400"
            />
            <span
              className={`ml-3 text-gray-700 ${
                item.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoItem;