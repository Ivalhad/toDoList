import { useState } from 'react';
import Input from './input';
import Button from './button';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  const [currentItemText, setCurrentItemText] = useState('');

  // Fungsi untuk menambah sub-item ke dalam daftar sementara
  const handleAddItem = () => {
    if (!currentItemText.trim()) return;
    const newItem = { text: currentItemText, completed: false };
    setItems([...items, newItem]);
    setCurrentItemText(''); // Kosongkan input sub-item
  };

  // Fungsi untuk mengirim seluruh data (judul + semua sub-item)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Judul utama tidak boleh kosong.');
      return;
    }
    onAdd({ title, items });
    // Reset form setelah submit
    setTitle('');
    setItems([]);
    setCurrentItemText('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Judul Utama To-Do..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Form untuk menambah sub-item */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Tambahkan sub-tugas..."
            value={currentItemText}
            onChange={(e) => setCurrentItemText(e.target.value)}
          />
          <Button type="button" onClick={handleAddItem} secondary>
            +
          </Button>
        </div>

        {/* Menampilkan daftar sub-item sementara */}
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>

        <Button type="submit" fullWidth>
          Simpan To-Do List
        </Button>
      </form>
    </div>
  );
};

export default AddTodo;