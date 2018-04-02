const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const forceSSL = require('express-force-ssl');
const logger = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const { errorHandler: bodyErrorHandler } = require('bodymen');
const { errorHandler: queryErrorHandler } = require('querymen');
const { env, apiRoot } = require('./config.js');

// Load express app
const app = express();

if (env === 'production') {
  app.set('forceSSLOptions', {
    enable301Redirects: false,
    trustXFPHeader: true,
  });
  app.use(forceSSL);
}

// ===BP: EXPRESS-HANDLEBARS
app.engine(
  'hbs',
  require('express-handlebars')({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
  }),
);

app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// ===BP: ADD METHOD OVERRIDE TO ALLOW FORMS TO SUBMIT DELETE AND PUT REQUESTS
app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

// ===BP: NODE-SASS-MIDDLEWARE
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
  }),
);

app.use(express.static(path.join(__dirname, 'public')));

// ===BP: REQUIRE ROUTES
app.use(apiRoot, require('./api/index.js'));

app.use(queryErrorHandler());
app.use(bodyErrorHandler());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
