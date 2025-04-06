const readlineSync = require('readline-sync');
const Bar = require('../../models/Bar');
const Avis = require('../../models/Avis');
const knex = require('knex')(require('../../knexfile').development);

class AvisConversationel {
  static async start(user) {
    if (!user) {
      console.log('Erreur: Aucune session citoyen active.');
      return;
    }

    console.log(`=== Question du jour : ===`);

    const bars = await knex('bars').where({ lieu: user.lieu }).select('*');

    if (bars.length === 0) {
      console.log(`Aucun bar trouve dans votre lieu (${user.lieu}).`);
      return;
    }

    console.log(`Bars disponibles a ${user.lieu}:`);
    bars.forEach((bar, index) => {
      console.log(`${index + 1}. ${bar.nom}`);
    });

    const barIndex = readlineSync.questionInt('Choisissez le bar dans lequel vous donnez votre avis (numero): ', {
      min: 1,
      max: bars.length
    });

    const selectedBar = bars[barIndex - 1];

    const note = readlineSync.questionInt(`Que pensez vous de l'etat actuel de la chaussee dans la commune ? ? Note (1-5): `, {
      min: 1,
      max: 5
    });

    const commentaire = readlineSync.question('Commentaire: ');

    await Avis.create({
      bar_id: selectedBar.id,
      user_id: user.id,
      note,
      commentaire
    });

    console.log(`Avis sur la question du jour enregistre avec succès!`);
  }
}


module.exports = AvisConversationel;
