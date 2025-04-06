const readlineSync = require('readline-sync');
const Bar = require('../../models/Bar');
const User = require('../../models/User');

class UserSessionConversationel {
  static async start() {
    console.log('=== Session Utilisateur Bar ===');

    const estMembre = readlineSync.keyInYNStrict('Etes-vous deja membre ?');

    if (estMembre) {
      const nom = readlineSync.question('Quel est votre nom ? ');

      const bar = await Bar.getByName(nom);

      if (bar) {
        console.log(`Bienvenue, ${bar.nom} !`);
        console.log(`Session Bar (Id: ${bar.id}, Nom: ${bar.nom}, Lieu: ${bar.lieu})`);
        return bar;
      } else {
        console.log('Erreur: Ce bar n\'existe pas dans notre système.');
        return null;
      }

    } else {
      console.log('Creation d\'un nouveau compte bar:');

      const nom = readlineSync.question('Nom du bar: ');
      const lieu = readlineSync.question('Lieu: ');
      const responsable_name = readlineSync.question('Nom du responsable: ');
      const email = readlineSync.question('Email: ');

      try {
        const barId = await Bar.create({
          nom,
          lieu,
          responsable_name,
          email
        });

        await User.create({
          nom,
          lieu,
          email,
          type: 'bar'
        });

        console.log(`Compte bar cree avec succes! ID: ${barId}`);

        const newBar = await Bar.getByName(nom);
        console.log(`Session Bar (Id: ${newBar.id}, Nom: ${newBar.nom}, Lieu: ${newBar.lieu})`);

        return newBar;
      } catch (error) {
        console.error('Erreur lors de la creation du compte:', error);
        return null;
      }
    }
  }
}

module.exports = UserSessionConversationel;