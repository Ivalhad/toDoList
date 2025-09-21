const mongoose = require('mongoose');

// Mendefinisikan skema (blueprint) untuk data to-do
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // Teks to-do wajib ada
  },
  completed: {
    type: Boolean,
    default: false, // Secara default, to-do belum selesai
  },
  createdAt: {
    type: Date,
    default: Date.now, // Waktu pembuatan to-do
  },
});

// Membuat model dari skema, yang akan merepresentasikan koleksi 'todos' di MongoDB
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
