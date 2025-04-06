exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.increments('id').primary();
    table.string('nom').notNullable();
    table.text('description');
    table.decimal('prix', 10, 2).notNullable();
    table.string('type').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};