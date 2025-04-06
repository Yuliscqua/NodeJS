exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('nom').notNullable();
    table.string('lieu').notNullable();
    table.string('email').notNullable().unique();
    table.string('type').notNullable().defaultTo('citoyen');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};