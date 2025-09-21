import { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api';
import AddTodo from '../components/addTodo';
import TodoItem from '../components/todoItem';

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error('Gagal mengambil data to-do:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleAdd = async (newTodo) => {
    try {
      const { data } = await createTodo(newTodo);
      setTodos([...todos, data]);
    } catch (error) {
      console.error('Gagal menambah to-do:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const { data } = await updateTodo(id, updatedData);
      setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
    } catch (error) {
      console.error('Gagal memperbarui to-do:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Gagal menghapus to-do:', error);
    }
  };

  return (
    <div className="bg-light min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Daftar Tugas Saya
          </h2>
          <AddTodo onAdd={handleAdd} />
          <div className="space-y-4">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Belum ada tugas.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListPage;