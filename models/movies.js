// models/movies.js
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: false },
  genre: { type: String, required: false},
  duration: { type: Number, required: false },
  releaseDate: { type: Date, required: false},
  director: { type: String, required: false},
  cast: { type: [String], required: false },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' }, // Relación con cine
});

module.exports = mongoose.model('Movie', MovieSchema);
