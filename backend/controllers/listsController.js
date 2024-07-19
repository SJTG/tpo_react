// controllers/listsController.js
const MovieList = require('../models/MovieList');

exports.getUserLists = async (req, res) => {
  try {
    const movieList = await MovieList.findOne({ user: req.user._id });
    if (!movieList) {
      return res.status(404).json({ message: 'Lists not found' });
    }
    res.json(movieList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addMovieToList = async (req, res) => {
  const { listType, movie } = req.body;

  try {
    const movieList = await MovieList.findOne({ user: req.user._id });
    if (!movieList) {
      return res.status(404).json({ message: 'Lists not found' });
    }

    // Check if the movie already exists in the list to avoid duplicates
    if (movieList[listType].some(m => m.id === movie.id)) {
      return res.status(400).json({ message: 'Movie already in the list' });
    }

    movieList[listType].push(movie);
    await movieList.save();

    res.json(movieList[listType]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeMovieFromList = async (req, res) => {
  const { listType, movieId } = req.body;

  try {
    const movieList = await MovieList.findOne({ user: req.user._id });
    if (!movieList) {
      return res.status(404).json({ message: 'Lists not found' });
    }

    movieList[listType] = movieList[listType].filter(movie => movie.id !== movieId);
    await movieList.save();

    res.json(movieList[listType]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
