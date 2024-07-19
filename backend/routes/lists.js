// Este archivo define las rutas para gestionar las listas de películas de los usuarios en la aplicación.

const express = require('express');
const { addMovieToList, getUserLists, removeMovieFromList } = require('../controllers/listsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getUserLists);
router.route('/add').post(protect, addMovieToList);
router.route('/remove').post(protect, removeMovieFromList);

module.exports = router;
