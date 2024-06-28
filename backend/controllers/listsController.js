// controllers/listsController.js
const MovieList = require('../models/MovieList');

exports.getUserLists = async (req, res) => {
  try {
    const lists = await MovieList.findOne({ user: req.user._id });
    res.json(lists);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addMovieToList = async (req, res) => {
  const { listType, movie } = req.body;

  try {
    let lists = await MovieList.findOne({ user: req.user._id });

    if (!lists) {
      lists = new MovieList({ user: req.user._id });
    }

    lists[listType].push(movie);
    await lists.save();
    res.json(lists);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeMovieFromList = async (req, res) => {
  const { listType, movieId } = req.body;

  try {
    const lists = await MovieList.findOne({ user: req.user._id });

    if (lists) {
      lists[listType] = lists[listType].filter(movie => movie.id !== movieId);
      await lists.save();
      res.json(lists);
    } else {
      res.status(404).json({ message: 'Lists not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
