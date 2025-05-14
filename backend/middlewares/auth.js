const jwt = require('jsonwebtoken');

const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const JWT_SECRET = 'jwt_secret_key';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED_CODE)
      .send({ message: 'Autenticación requerida. No se proporcionó token.' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res
      .status(FORBIDDEN_CODE)
      .send({ message: 'Acceso prohibido. Token inválido.' });
  }
};
