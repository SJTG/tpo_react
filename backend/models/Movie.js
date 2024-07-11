// models/Movie.js
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  poster_path: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  genre_ids: [Number]
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
