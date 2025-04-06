const knex = require('knex')(require('../knexfile').development);

class Product {
  static async getAll() {
    return await knex('products').select('*');
  }

  static async getById(id) {
    return await knex('products').where({ id }).first();
  }

  static async create(productData) {
    return await knex('products').insert(productData);
  }

  static async update(id, productData) {
    return await knex('products').where({ id }).update(productData);
  }

  static async delete(id) {
    return await knex('products').where({ id }).del();
  }
}

module.exports = Product;