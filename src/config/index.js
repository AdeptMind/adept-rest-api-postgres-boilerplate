const dotenv = require('dotenv-safe');
const path = require('path');

dotenv.config({ allowEmptyValues: true });

const config = {
  all: {
    API_ROOT: process.env.API_ROOT || '',
    DB_CLIENT: process.env.DATABASE_CLIENT || 'pg',
    DB_CONNECTION: process.env.DATABASE_URL || {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: process.env.DATABASE_PORT || 5432,
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    IP: process.env.IP || '0.0.0.0',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 9000,
    ROOT: path.join(__dirname, '..'),
  },
  test: {
    DB_CLIENT: 'sqlite3',
    DB_CONNECTION: ':memory:',
  },
};

module.exports = Object.assign(config.all, config[config.all.NODE_ENV]);
