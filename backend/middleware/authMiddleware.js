const jwt = require('jsonwebtoken');
const User = require('../models/user');
const InvalidToken = require('../models/invalidToken'); // Impor model baru

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // 1. Cek apakah token ada di denylist
      const tokenIsInvalid = await InvalidToken.findOne({ token });
      if (tokenIsInvalid) {
        // Jika token ditemukan di denylist, tolak akses
        return res.status(401).json({ message: 'Not authorized, token is invalid' });
      }

      // 2. Verifikasi token (seperti sebelumnya)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ambil data user dari token (tanpa password) dan lampirkan ke object request
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next(); // Lanjutkan ke rute selanjutnya jika semua aman
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };

