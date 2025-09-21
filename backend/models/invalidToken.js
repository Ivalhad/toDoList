const mongoose = require('mongoose');

const invalidTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  // Dokumen ini akan otomatis dihapus dari database setelah tanggal ini
  expireAt: {
    type: Date,
    required: true,
  },
});

// Membuat TTL (Time-To-Live) index. MongoDB akan otomatis menghapus
// dokumen ketika waktu 'expireAt' tercapai. Ini sangat efisien.
invalidTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const InvalidToken = mongoose.model('InvalidToken', invalidTokenSchema);

module.exports = InvalidToken;
