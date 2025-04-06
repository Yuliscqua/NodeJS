const knex = require('knex')(require('../knexfile').development);

class Avis {
  static async getAll() {
    return await knex('avis').select('*');
  }

  static async getByBarId(barId) {
    return await knex('avis')
      .where({ bar_id: barId })
      .join('users', 'avis.user_id', 'users.id')
      .select('avis.*', 'users.nom as user_name');
  }

  static async create(avisData) {
    return await knex('avis').insert(avisData);
  }

  static async update(id, avisData) {
    return await knex('avis').where({ id }).update(avisData);
  }

  static async delete(id) {
    return await knex('avis').where({ id }).del();
  }
}

module.exports = Avis;
