exports.up = function (knex) {
  return knex.schema.createTable('orders', function (table) {
    table.increments('id').primary();
    table.integer('bar_id').unsigned().references('id').inTable('bars');
    table.integer('product_id').unsigned().references('id').inTable('products');
    table.string('status').notNullable().defaultTo('pending');
    table.date('date_livraison');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
