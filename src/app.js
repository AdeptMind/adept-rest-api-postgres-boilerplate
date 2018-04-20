const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const { errorHandler: bodyErrorHandler } = require('bodymen');

const ApiRoute = require('./api');
const { API_ROOT } = require('./config.js');

const app = express();

app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  methodOverride(function(req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

app.use(express.static(path.join(__dirname, 'public')));

app.use(API_ROOT, ApiRoute);

app.use(bodyErrorHandler());

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
