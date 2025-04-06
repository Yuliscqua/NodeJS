exports.up = function (knex) {
  return knex.schema.createTable('bars', function (table) {
    table.increments('id').primary();
    table.string('nom').notNullable();
    table.string('lieu').notNullable();
    table.string('responsable_name').notNullable();
    table.string('email').notNullable().unique();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('bars');
};