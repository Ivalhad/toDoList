const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  title: {
    type: String,
    required: [true, "Judul tidak boleh kosong"],
    trim: true,
  },

  deadline: {
    type: Date,
  },

  items: [itemSchema],
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;