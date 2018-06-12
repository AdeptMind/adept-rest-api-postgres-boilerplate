const { addColors, createLogger, format, transports } = require('winston');

const { combine, colorize, printf, timestamp } = format;

const logFormat = printf((info) => {
  return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

const config = require('../config');

/*
 *  You can add a file transport without color with the following:
 *
 *   new transports.File({
 *     filename: 'combined.log',
 *     format: combine(...getLogFormat()),
 *   }),
 */

const logger = createLogger({
  level: config.LOG_LEVEL,
  transports: [
    new transports.Console({
      format: combine(colorize(), ...getLogFormat()),
    }),
  ],
});

logger.stream = {
  write: (message) => {
    // XXX(Phong): use the 'info' log level so the output will be picked up by
    // both transports (file and console)
    logger.info(message);
  },
};

addColors({
  debug: 'white',
  error: 'red',
  info: 'green',
  warn: 'yellow',
});

function getLogFormat() {
  return [timestamp({ format: 'YYYY-MM-DD HH:mm:ss ZZ' }), logFormat];
}

module.exports = logger;
