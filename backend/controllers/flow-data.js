const jwt = require('jsonwebtoken');
const flowDataRouter = require('express').Router();
const data = require('../flow-data.json');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

flowDataRouter.get('/current-data', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }
    const currentData = data[data.length - 1];
    response.json(currentData);
  } catch (error) {
    next(error);
  }
});

flowDataRouter.get(
  '/flow-history/flow-rate',
  async (request, response, next) => {
    try {
      const decodedToken = jwt.verify(
        getTokenFrom(request),
        process.env.SECRET
      );
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = flowDataRouter;
