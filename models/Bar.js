const knex = require('knex')(require('../knexfile').development);

class Bar {
  static async getAll() {
    return await knex('bars').select('*');
  }

  static async getById(id) {
    return await knex('bars').where({ id }).first();
  }

  static async getByName(nom) {
    return await knex('bars').where({ nom }).first();
  }

  static async create(barData) {
    return await knex('bars').insert(barData).returning('*');
  }

  static async update(id, barData) {
    return await knex('bars').where({ id }).update(barData);
  }

  static async delete(id) {
    return await knex('bars').where({ id }).del();
  }
}

module.exports = Bar;
