const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
  namakapal: {
    type: String,
    required: true
  },
  jeniskapal: {
    type: String,
    required: true
  },
  tahunpembuatan: {
    type: Number,
    required: true
  }
},{collection: 'kapal' });

module.exports = mongoose.model('Ships', shipSchema);
