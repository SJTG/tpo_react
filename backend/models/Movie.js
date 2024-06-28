// backend/models/Movie.js
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    actors: [String],
    director: { type: String, required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);