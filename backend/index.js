require('dotenv').config();
const express = require('express');
const loginRouter = require('./controllers/login');

const app = express();

app.use(express.json());

app.use('/api/login/', loginRouter);

app.get('/', (request, response) => {
  response.send('<h1>The Server is running!<h1>');
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  next(error);
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
