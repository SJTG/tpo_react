// Este modelo define la estructura 
// y los requisitos para las listas de películas asociadas a un usuario en la base de datos

const mongoose = require('mongoose');

const MovieListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  favoritas: [{
    id: Number,
    title: String,
    poster_path: String,
    overview: String,
    genre_ids: [Number]
  }],
  vistas: [{
    id: Number,
    title: String,
    poster_path: String,
    overview: String,
    genre_ids: [Number]
  }],
  porVer: [{
    id: Number,
    title: String,
    poster_path: String,
    overview: String,
    genre_ids: [Number]
  }]
});

const MovieList = mongoose.model('MovieList', MovieListSchema);

module.exports = MovieList;
