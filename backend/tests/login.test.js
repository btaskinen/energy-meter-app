const supertest = require('supertest');
const app = require('../app');
const { describe } = require('node:test');

const api = supertest(app);

describe('testing the login of user', () => {
  test('successful login', async () => {
    const loginData = {
      username: 'JDoe',
      password: 'secret',
    };

    const response = await api
      .post('/api/login')
      .send(loginData)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.token);
    expect(response.body.username).toBe('JDoe');
    expect(response.body.name).toBe('Jane Doe');
  });

  test('unsuccessful login: username does not exist', async () => {
    const loginData = {
      username: 'JamesD',
      password: 'secret',
    };

    const response = await api
      .post('/api/login')
      .send(loginData)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBe('username does not exist');
  });

  test('unsuccessful login: wrong password', async () => {
    const loginData = {
      username: 'JDoe',
      password: 'foo',
    };

    const response = await api
      .post('/api/login')
      .send(loginData)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBe('password incorect');
  });

  test('unsuccessful login: missing password', async () => {
    const loginData = {
      username: 'JDoe',
    };

    const response = await api
      .post('/api/login')
      .send(loginData)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBe('username or password missing');
  });
});
