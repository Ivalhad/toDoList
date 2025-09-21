const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const InvalidToken = require('../models/invalidToken');
const { protect } = require('../middleware/authMiddleware'); 

// Fungsi untuk generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });
};

router.post('/register', async (req, res) => {
  const { name, password } = req.body;

  try {
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


router.post('/logout', protect, async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Simpan token ke denylist
    await InvalidToken.create({
      token,

      expireAt: new Date(decoded.exp * 1000), 
    });

    res.status(200).json({ message: 'Logout berhasil' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;

