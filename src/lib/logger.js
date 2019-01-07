const { addColors, createLogger, format, transports } = require('winston');

const config = require('../config');

const errorFormat = format((info) => {
  const splat = (info && info[Symbol.for('splat')]) || [];
  const e = splat.length && splat[splat.length - 1];
  if (e instanceof Error) {
    return {
      ...(info || {}),
      stack: e.stack,
      [Symbol.for('splat')]: splat.splice(splat.length - 1, 1, e.message),
    };
  }
  return info;
});

// XXX(Phong): TODO: pull this out into its own blacklist file, needs to
// support regex
const BLACKLIST = [];
const blacklistStrings = format((info) => {
  let msg;
  if (typeof info === 'object') {
    msg = info.message;
  } else if (typeof info === 'string') {
    msg = info;
  }

  // XXX(Phong): we want all strings to go through, including empty '' strings.
  // If it's any other case, then it's probably an edge-case we did not consider
  // and we should just pass it through as not to crash the service.
  if (!msg && typeof msg !== 'string') {
    return info;
  }

  try {
    const found = BLACKLIST.find(
      (ignoredString) => msg.search(ignoredString) > -1,
    );
    if (found) {
      return false;
    }
  } catch (e) {
    console.error(`Logger blacklist failed: ${e.message}`);
  }
  return info;
});

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
      format: format.combine(
        blacklistStrings(),
        errorFormat(),
        format.colorize(),
        format.splat(),
        format.simple(),
      ),
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

module.exports = logger;
