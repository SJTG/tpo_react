//Este archivo define una ruta para obtener todas las películas almacenadas en la base de datos. 

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