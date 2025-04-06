const readlineSync = require('readline-sync');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

class OrderConversationel {
  static async start(bar) {
    if (!bar) {
      console.log('Erreur: Aucune session bar active.');
      return;
    }

    console.log(`=== Gestion des commandes pour ${bar.nom} ===`);

    const existingOrders = await Order.getByBarId(bar.id);

    if (existingOrders.length > 0) {
      console.log('Vous avez deja une ou plusieurs machines:');
      existingOrders.forEach((order, index) => {
        console.log(`${index + 1}. ${order.product_name} (Status: ${order.status})`);
      });

      const changeMachine = readlineSync.keyInYNStrict('Voulez-vous changer votre machine ?');

      if (changeMachine) {
        const products = await Product.getAll();
        console.log('\nProduits disponibles:');
        products.forEach((product, index) => {
          console.log(`${index + 1}. ${product.nom} - ${product.description} - ${product.prix}€`);
        });

        const productIndex = readlineSync.questionInt('Choisissez le numero du produit: ', {
          min: 1,
          max: products.length
        });

        const selectedProduct = products[productIndex - 1];

        await Order.create({
          bar_id: bar.id,
          product_id: selectedProduct.id,
          status: 'pending'
        });

        console.log(`Commande pour ${selectedProduct.nom} creee avec succes!`);
      }
    } else {
      console.log('Vous n\'avez pas encore de machine.');

      const newMachine = readlineSync.keyInYNStrict('Voulez-vous une nouvelle machine ?');

      if (newMachine) {
        const products = await Product.getAll();
        console.log('\nProduits disponibles:');
        products.forEach((product, index) => {
          console.log(`${index + 1}. ${product.nom} - ${product.description} - ${product.prix}€`);
        });

        const productIndex = readlineSync.questionInt('Choisissez le numero du produit: ', {
          min: 1,
          max: products.length
        });

        const selectedProduct = products[productIndex - 1];

        await Order.create({
          bar_id: bar.id,
          product_id: selectedProduct.id,
          status: 'pending'
        });

        console.log(`Commande pour ${selectedProduct.nom} creee avec succès!`);
      }
    }
  }
}

module.exports = OrderConversationel;
