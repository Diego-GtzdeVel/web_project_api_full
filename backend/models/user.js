const mongoose = require('mongoose');
const validator = require('validator');

const urlRegex = /^(https?:\/\/)(www\.)?[\w-]+(\.[\w-]+)+([/\w-._~:/?#[\]@!$&'()*+,;=]*)#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} no es un enlace válido al avatar.`,
    },
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} no es un correo electrónico válido.`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
