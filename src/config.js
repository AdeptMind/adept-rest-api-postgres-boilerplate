const dotenv = require('dotenv-safe');
const path = require('path');

dotenv.config({ allowEmptyValues: true });

const config = {
  all: {
    API_ROOT: process.env.API_ROOT || '',
    IP: process.env.IP || '0.0.0.0',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 9000,
    ROOT: path.join(__dirname, '..'),
  },
  development: {
    DB_CONNECTION: {
      host: '127.0.0.1',
      user: 'adept',
      password: 'Adept123',
      database: process.env.DATABASE_NAME,
    },
  },
  production: {
    DB_CONNECTION: process.env.DATABASE_URL,
  },
};

module.exports = Object.assign(config.all, config[config.all.NODE_ENV]);
