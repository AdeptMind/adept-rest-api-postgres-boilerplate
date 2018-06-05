const { success } = require('./responses');

const ping = (req, res) => {
  return success(res, 'pong');
};

module.exports = {
  ping,
};
