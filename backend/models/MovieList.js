// Este modelo define la estructura 
// y los requisitos para las listas de películas asociadas a un usuario en la base de datos

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
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

const MovieListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  favoritas: [movieSchema],
  vistas: [movieSchema],
  porVer: [movieSchema]
});

const MovieList = mongoose.model('MovieList', MovieListSchema);

module.exports = MovieList;
