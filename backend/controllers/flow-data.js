const jwt = require('jsonwebtoken');
const flowDataRouter = require('express').Router();

const currentData = {
  flowRate: 0.75,
  energyFlowRate: 18.5,
  velocity: 0.63,
  fluidSoundSpeed: 1657.1,
  temperatureInlet: 7.1,
  temperatureOutlet: 10.8,
  date: new Date().toString(),
};

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
    response.json(currentData);
  } catch (error) {
    next(error);
  }
});

module.exports = flowDataRouter;
