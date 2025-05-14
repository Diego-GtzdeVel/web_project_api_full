const Card = require('../models/card');

const ERROR_CODE = 400;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(SERVER_ERROR_CODE).send({ message: 'Error del servidor', error: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link, ownerId } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Datos inválidos al crear la tarjeta',
          error: err.message,
        });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Error del servidor', error: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({ message: 'Tarjeta no encontrada' });
      }

      if (card.owner.toString() !== req.user._id) {
        return res.status(FORBIDDEN_CODE).send({ message: 'No tienes permiso para eliminar esta tarjeta' });
      }

      return Card.findByIdAndDelete(cardId)
        .then(() => res.send({ message: 'Tarjeta eliminada correctamente' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'ID de tarjeta no válido' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Error del servidor', error: err.message });
    });
};


module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({ message: 'Tarjeta no encontrada' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'ID de tarjeta no válido' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Error del servidor', error: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({ message: 'Tarjeta no encontrada' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'ID de tarjeta no válido' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Error del servidor', error: err.message });
    });
};
