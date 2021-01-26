const request = require('supertest');

const Route = require('.');
const app = require('../app');

const App = app('/', Route);

test('GET /ping', async () => {
  await request(App).get('/ping').expect(200, { success: true, data: 'pong' });
});
