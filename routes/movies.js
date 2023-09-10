const movieRoutes = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const {
  validateCreateMovie,
  validateMovieId,
} = require('../middlewares/validators');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', validateCreateMovie, createMovie);
movieRoutes.delete('/:movieId', validateMovieId, deleteMovieById);

module.exports = movieRoutes;
