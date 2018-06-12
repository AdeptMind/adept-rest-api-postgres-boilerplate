const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const { errorHandler: bodyErrorHandler } = require('bodymen');

const winston = require('./lib/logger');
const { error } = require('./api/responses');

module.exports = (apiRoot, routes) => {
  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(morgan('combined', { stream: winston.stream }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(
    methodOverride((req) => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    }),
  );

  app.use(apiRoot, routes);

  app.use(bodyErrorHandler());

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    if (err.status) {
      next(err);
    } else {
      console.error(err);
      error(res, err.message);
    }
  });

  return app;
};
