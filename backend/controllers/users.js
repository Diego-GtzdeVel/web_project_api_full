const user = require('../models/user');

const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(SERVER_ERROR_CODE).send({ message: 'Error del servidor', error: err.message }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_CODE).send({ message: 'Usuario no encontrado' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'ID de usuario no válido' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Error del servidor', error: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  User.create({ name, about, avatar, email, password })
    .then((user) => res.status(201).send(user))
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
