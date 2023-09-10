const router = require('express').Router();

const routesMovies = require('./movies');
const routesUsers = require('./users');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', routesUsers);
router.use('/movies', routesMovies);
router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурc не найден'));
});

module.exports = router;
