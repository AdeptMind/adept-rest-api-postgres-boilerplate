exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('name');
    table.integer('age');
    table.boolean('is_admin').defaultTo(false);
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
