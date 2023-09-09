require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/router');
const handlerCORS = require('./middlewares/handlerCORS');
const errorHandler = require('./middlewares/errorHandler');
const {
  validateCreateUser, validateLogin,
} = require('./middlewares/validators');
const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_CONN } = process.env;

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(handlerCORS);
app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
