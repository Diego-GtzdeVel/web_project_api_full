const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log('Servidor corriendo!');
});
