const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неверный адрес почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new AuthError('Неверный адрес почты или пароль'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new AuthError('Неверный адрес почты или пароль'));
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
