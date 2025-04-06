const knex = require('knex')(require('../knexfile').development);

class User {
  static async getAll() {
    return await knex('users').select('*');
  }

  static async getById(id) {
    return await knex('users').where({ id }).first();
  }

  static async getByName(nom) {
    return await knex('users').where({ nom }).first();
  }

  static async create(userData) {
    return await knex('users').insert(userData);
  }

  static async update(id, userData) {
    return await knex('users').where({ id }).update(userData);
  }

  static async delete(id) {
    return await knex('users').where({ id }).del();
  }
}

module.exports = User;