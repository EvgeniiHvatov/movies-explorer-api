const userRoutes = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  validateUpdateProfile,
} = require('../middlewares/validators');

userRoutes.get('/me', getUser);
userRoutes.patch('/me', validateUpdateProfile, updateUser);

module.exports = userRoutes;
