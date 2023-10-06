const supertest = require('supertest');
const app = require('../app');
const { describe } = require('node:test');

const api = supertest(app);

describe('testing fetching data from server', () => {
  test('data is returned as JSON', async () => {
    const loginData = {
      username: 'JDoe',
      password: 'secret',
    };
    const response = await api.post('/api/login').send(loginData);

    const token = response.body.token;

    await api
      .get('/api/flow-data/latest-data')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('fetching data without authentication', async () => {
    const response = await api.get('/api/flow-data/latest-data').expect(400);
    const returnedMessage = JSON.parse(response.text);
    expect(returnedMessage.error).toBe('jwt must be provided');
  });
});
