const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Fungsi untuk generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token akan kadaluarsa dalam 30 hari
  });
};

router.post('/register', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Cek apakah user sudah ada
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res.status(400).json({ message: 'Nama user sudah digunakan' });
    }

    const user = await User.create({
      name,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Data user tidak valid' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {

    const user = await User.findOne({ name });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Nama atau password salah' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
