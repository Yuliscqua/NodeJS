const readlineSync = require('readline-sync');
const UserSessionConversationel = require('./conversations/bars/UserSessionConversationel');
const OrderConversationel = require('./conversations/bars/OrderConversationel');
const CitoyenSessionConversationel = require('./conversations/citoyens/CitoyenSessionConversationel');
const AvisConversationel = require('./conversations/citoyens/AvisConversationel');

const knex = require('knex')(require('./knexfile').development);

async function initializeDatabase() {
    try {
        const tablesExist = await knex.schema.hasTable('bars');

        if (!tablesExist) {
            console.log('Initialisation de la base de données...');
            await knex.migrate.latest();
            console.log('Migration des tables terminee avec succes!');

            await knex('products').insert([
                {
                    nom: 'Machine de developpement de vie citoyenne',
                    description: 'Machine servant à répondre à des questions citoyennes',
                    prix: 600.00,
                    type: 'machine'
                },
            ]);
            console.log('Produits par defaut ajoutes avec succes!');
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de donnees:', error);
        process.exit(1);
    }
}

async function main() {
    await initializeDatabase();

    console.log('=== Systeme de Gestion des Bars ===');

    while (true) {
        console.log('\nChoisissez votre parcours:');
        console.log('1. Parcours Bar');
        console.log('2. Parcours Citoyen');
        console.log('0. Quitter');

        const choix = readlineSync.questionInt('Votre choix: ', {
            min: 0,
            max: 2
        });

        if (choix === 0) {
            console.log('Au revoir!');
            process.exit(0);
        }

        if (choix === 1) {
            // Parcours Bar
            const bar = await UserSessionConversationel.start();
            if (bar) {
                await OrderConversationel.start(bar);
            }
        } else if (choix === 2) {
            // Parcours Citoyen
            const user = await CitoyenSessionConversationel.start();
            if (user) {
                await AvisConversationel.start(user);
            }
        }
    }
}

main().catch(error => {
    console.error('Erreur dans l\'application:', error);
    process.exit(1);
});