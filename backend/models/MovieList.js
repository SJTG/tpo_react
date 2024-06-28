// models/MovieList.js
const mongoose = require('mongoose');

const MovieListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Favoritas: [{
    id: Number,
    title: String,
  }],
  Vistas: [{
    id: Number,
    title: String,
  }],
  porVer: [{
    id: Number,
    title: String,
  }]
});

const MovieList = mongoose.model('MovieList', MovieListSchema);

module.exports = MovieList;