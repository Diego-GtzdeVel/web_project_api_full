const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');


const ERROR_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Usuario no encontrado');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('ID de usuario no válido');
      }
      return next(err);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      return User.create({ name, about, avatar, email, password: hash });
    })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Datos inválidos al crear el usuario', error: err.message });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Error del servidor', error: err.message });
    });
};



module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Datos inválidos al actualizar el usuario', error: err.message });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Error del servidor', error: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Datos inválidos al actualizar el avatar', error: err.message });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Error del servidor', error: err.message });
    });
};


module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Credenciales incorrectas'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Credenciales incorrectas'));
          }

          const token = jwt.sign(
            { _id: user._id },
            'jwt_secret_key', // reemplazar esto con process.env.JWT_SECRET en producción
            { expiresIn: '7d' }
          );

          res.send({ token });
        });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED_CODE).send({ message: err.message || 'Error de autenticación' });
    });
};

module.exports.getUserInfo = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error del servidor', error: err.message });
    });
};


