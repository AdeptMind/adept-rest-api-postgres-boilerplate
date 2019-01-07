const mockKnex = require('mock-knex');
const request = require('supertest');

const Post = require('../posts/model');
const Route = require('.');
const User = require('../users/model');
const app = require('../../app');

const App = app('/', Route);

/**
 * This is just a sample integration test. Typically you wouldn't need to write
 * a test for a controller method like this, which only performs a single DB
 * request through Knex. Endpoints that have more complex logic require one test
 * suite each (denoted by `describe` blocks).
 *
 * By default, all DB requests made in the `test` environment hit an in-memory
 * SQLite process. There are certain incompatibilities between SQLite and our
 * normal Postgres connection, which you will want to keep in mind when writing
 * these unit tests. (If this proves problematic later, we can find a way to use
 * a Dockerized version of Postgres instead, or some other solution.) We also
 * have a way to track DB requests and mock responses, using the `mock-knex`
 * module, also demonstrated in this test suite.
 */

describe('POST /posts', () => {
  // mock-knex can let you install your own mock implementation of a Knex query.
  // This method is used to catch an `insertAndFetch` call from objection, and
  // shows some of the ways in which you can assert a query's contents, or give
  // mock responses (based on the contents of the original query).
  const mockInsertAndFetch = (query) => {
    if (query.method === 'insert') {
      const expectedQuery = Post.knexQuery()
        .insert({
          created_at: query.bindings[0],
          user_id: user.id,
          description: 'test',
        })
        .toSQL();
      expect(query.sql).toEqual(expectedQuery.sql);
      expect(query.bindings).toEqual(expectedQuery.bindings);
      query.response([1]);
    } else {
      expect(query.method).toEqual('select');
      const tableNameMatch = query.sql.match(/from `(\w+)`/);
      expect(tableNameMatch).not.toBeNull();
      switch (tableNameMatch[1]) {
        case 'users': {
          query.response([user]);
          break;
        }
        case 'posts': {
          query.response([{ user_id: user.id, description: 'test' }]);
          break;
        }
        default: {
          query.reject('Unexpected select');
        }
      }
    }
  };

  let user;

  beforeEach(async () => {
    user = await User.query().insertAndFetch({ email: 'test@example.com' });
  });

  it('should get the correct data', async () => {
    await request(App)
      .post('/')
      .send({ user_id: user.id, description: 'test' })
      .expect(200)
      .expect((res) => {
        const { description, user: payloadUser } = res.body.data;
        expect(description).toEqual('test');
        expect(payloadUser.id).toEqual(user.id);
        expect(payloadUser.email).toEqual(user.email);
      });
  });

  it('should execute the correct queries', async () => {
    const tracker = mockKnex.getTracker();
    mockKnex.mock(Post.knex());
    tracker.install();
    tracker.on('query', mockInsertAndFetch);

    try {
      await request(App)
        .post('/')
        .send({ user_id: user.id, description: 'test' })
        .expect(200)
        .expect((res) => {
          const { id, description, user: payloadUser } = res.body.data;
          expect(id).toEqual(1);
          expect(description).toEqual('test');
          expect(payloadUser.id).toEqual(user.id);
          expect(payloadUser.email).toEqual(user.email);
        });
    } finally {
      tracker.uninstall();
      mockKnex.unmock(Post.knex());
    }
  });
});
