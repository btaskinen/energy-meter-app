const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();

const users = [
  {
    username: 'JDoe',
    name: 'Jane Doe',
    password: 'secret',
    id: 1,
  },
  {
    username: 'TommyG',
    name: 'Thomas Gordon',
    password: 'secret',
    id: 2,
  },
];

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(401).json({
      error: 'username or password missing',
    });
  }

  const loggedinUser = users.find((user) => user.username === username);

  if (!loggedinUser) {
    return response.status(401).json({
      error: 'username does not exist',
    });
  }

  const passwordCorrect = loggedinUser.password === password;
  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'password incorect',
    });
  }

  const userForToken = {
    username: loggedinUser.username,
    id: loggedinUser.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: loggedinUser.username, name: loggedinUser.name });
});

module.exports = loginRouter;
