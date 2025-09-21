const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  },
  text: {
    type: String,
    required: [true, "Teks tidak boleh kosong"]
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true 
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;