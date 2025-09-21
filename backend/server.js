require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Server berjalan');
});

const todoRoutes = require('./routes/todo');
app.use('/api/todos', todoRoutes);

const startServer = () => {

  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {

      app.listen(PORT, () => {
        console.log(`Server berjalan di: http://localhost:${PORT}`);
        console.log("Terhubung ke MongoDB.");
      });
    })
    .catch(err => {

      console.error("Server error: Tidak dapat terhubung ke MongoDB.");
      console.error("Detail Error:", err.message); 
      process.exit(1);
    });
};

startServer();

