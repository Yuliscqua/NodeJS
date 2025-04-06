const knex = require('knex')(require('../knexfile').development);

class Order {
  static async getAll() {
    return await knex('orders').select('*');
  }

  static async getByBarId(barId) {
    return await knex('orders')
      .where({ bar_id: barId })
      .join('products', 'orders.product_id', 'products.id')
      .select('orders.*', 'products.nom as product_name');
  }

  static async create(orderData) {
    return await knex('orders').insert(orderData);
  }

  static async update(id, orderData) {
    return await knex('orders').where({ id }).update(orderData);
  }

  static async delete(id) {
    return await knex('orders').where({ id }).del();
  }
}

module.exports = Order;
