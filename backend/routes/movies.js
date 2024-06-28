// backend/routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Ruta para obtener todas las peliculas
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;