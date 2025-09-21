// 1. Impor paket yang diperlukan
require('dotenv').config(); // Untuk memuat variabel dari .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 2. Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Gunakan Middleware
app.use(cors()); // Mengizinkan akses dari origin yang berbeda
app.use(express.json()); // Mem-parsing body request sebagai JSON

// 4. Koneksi ke MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));

// 5. Gunakan Rute API
const todoRoutes = require('./routes/todo');
app.use('/api/todos', todoRoutes); // Semua rute di todos.js akan diawali dengan /api/todos

// 6. Jalankan Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
