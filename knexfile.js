const config = require('./src/config');

// In terminal open psql and create a new database. Then include the name of the database and your username and password in the development details below
// Run the following terminal command
// $ psql
// # CREATE DATABASE nameofyourdatabase;
// Note: remember the semicolon syntax
// # \q

// To check if database was created run psql and \l to see full list of databases

module.exports = {
  client: config.DB_CLIENT,
  connection: config.DB_CONNECTION,
  migrations: {
    directory: __dirname + '/src/db/migrations',
  },
  seeds: {
    directory: __dirname + '/src/db/seeds',
  },
  useNullAsDefault: config.DB_CLIENT === 'sqlite3',
};
