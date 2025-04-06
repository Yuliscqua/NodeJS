module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/db.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};