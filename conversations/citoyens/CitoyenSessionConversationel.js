const readlineSync = require('readline-sync');
const User = require('../../models/User');

class CitoyenSessionConversationel {
  static async start() {
    console.log('=== Session Utilisateur Citoyen ===');

    const estMembre = readlineSync.keyInYNStrict('Etes-vous deja membre ?');

    if (estMembre) {
      const nom = readlineSync.question('Quel est votre nom ? ');

      const user = await User.getByName(nom);

      if (user && user.type === 'citoyen') {
        console.log(`Bienvenue, ${user.nom} !`);
        console.log(`Session Citoyen (Id: ${user.id}, Nom: ${user.nom}, Lieu: ${user.lieu})`);
        return user;
      } else {
        console.log('Erreur: Ce citoyen n\'existe pas dans notre systeme.');
        return null;
      }

    } else {
      console.log('Creation d\'un nouveau compte citoyen:');

      const nom = readlineSync.question('Nom: ');
      const lieu = readlineSync.question('Lieu: ');
      const email = readlineSync.question('Email: ');

      try {
        const userId = await User.create({
          nom,
          lieu,
          email,
          type: 'citoyen'
        });

        console.log(`Compte citoyen cree avec succes! ID: ${userId}`);

        const newUser = await User.getByName(nom);
        console.log(`Session Citoyen (Id: ${newUser.id}, Nom: ${newUser.nom}, Lieu: ${newUser.lieu})`);

        return newUser;
      } catch (error) {
        console.error('Erreur lors de la creation du compte:', error);
        return null;
      }
    }
  }
}

module.exports = CitoyenSessionConversationel;