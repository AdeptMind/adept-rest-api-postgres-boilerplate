exports.up = function (knex) {
  return knex.schema.createTable('posts', function (table) {
    table.increments();
    table.string('description').notNullable();
    table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('set null');
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts');
};
