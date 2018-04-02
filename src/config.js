const dotenv = require('dotenv-safe');
const path = require('path');

dotenv.config({ allowEmptyValues: true });

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
  },
  development: {
    dbConnection: {
      host: '127.0.0.1',
      user: 'adept',
      password: 'Adept123',
      database: 'adeptmind',
    },
  },
  production: {
    dbConnection: process.env.DATABASE_URL,
  },
};

module.exports = Object.assign(config.all, config[config.all.env]);
