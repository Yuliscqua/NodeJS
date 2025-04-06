exports.up = function (knex) {
  return knex.schema.createTable('avis', function (table) {
    table.increments('id').primary();
    table.integer('bar_id').unsigned().references('id').inTable('bars');
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.integer('note').notNullable();
    table.text('commentaire');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('avis');
};
