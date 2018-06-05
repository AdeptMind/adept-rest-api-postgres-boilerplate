const BaseModel = require('./base.model');

beforeEach(async () => {
  await BaseModel.knex().migrate.latest();
});

afterEach(async () => {
  await BaseModel.knex().migrate.rollback();
});

afterAll(async () => {
  await BaseModel.knex().destroy();
});
