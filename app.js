require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
// const router = require('./routes/router');
// const handlerCORS = require('./middlewares/handlerCORS');

// const {
//   validateSignUp, validateSignIn,
// } = require('./middlewares/validators');
// const {
//   createUser,
//   login,
// } = require('./controllers/users');
// const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_CONN } = process.env;

mongoose.connect(DB_CONN, {
});

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
// app.use(handlerCORS);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// app.post('/signup', validateSignUp, createUser);
// app.post('/signin', validateSignIn, login);
// app.use(auth);
// app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const {
    status = 500,
    message,
  } = err;
  res.status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

// mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
