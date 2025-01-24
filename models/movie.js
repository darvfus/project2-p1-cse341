const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  cast: { type: [String], required: true },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' }, // Relación con cine
});

module.exports = mongoose.model('Movie', movieSchema);