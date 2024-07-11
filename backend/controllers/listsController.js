// controllers/listsController.js
const User = require('../models/User');
const Movie = require('../models/Movie');

exports.getUserLists = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favoritas vistas porVer');
    res.json({
      favoritas: user.favoritas,
      vistas: user.vistas,
      porVer: user.porVer
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addMovieToList = async (req, res) => {
  const { listType, movie } = req.body;

  try {
    const user = await User.findById(req.user._id);

    const movieDoc = await Movie.findById(movie._id);
    if (!movieDoc) {
      await Movie.create(movie);
    }

    user[listType].push(movie._id);
    await user.save();

    res.json(user[listType]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeMovieFromList = async (req, res) => {
  const { listType, movieId } = req.body;

  try {
    const user = await User.findById(req.user._id);
    user[listType] = user[listType].filter(movie => movie.toString() !== movieId);
    await user.save();

    res.json(user[listType]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
