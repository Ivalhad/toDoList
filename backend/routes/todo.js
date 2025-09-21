const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const { protect } = require('../middleware/authMiddleware');


router.use(protect);


router.get('/', async (req, res) => {
  try {

    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: "Teks tidak boleh kosong" });
  }
  
  try {
    const newTodo = new Todo({
      text: req.body.text,
      user: req.user._id 
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'To-do tidak ditemukan' });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Akses tidak diizinkan' });
    }
    
    todo.completed = req.body.completed ?? todo.completed;
    todo.text = req.body.text ?? todo.text;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'To-do tidak ditemukan' });
    }
    
    // 6. Pastikan user yang login adalah pemilik to-do
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Akses tidak diizinkan' });
    }

    await todo.deleteOne();
    res.json({ message: 'To-do berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


module.exports = router;