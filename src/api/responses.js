const error = function(res, message) {
  console.error(message);
  res.status(500).send(message);
};

const forbidden = function(res, message) {
  res.status(403).send(message);
};

const notFound = function(res, message) {
  res.status(404).send(message);
};

const redirect = function(res, url) {
  res.redirect(url);
};

const success = function(res, data) {
  res.status(200).json(data);
};

module.exports = {
  error,
  forbidden,
  notFound,
  redirect,
  success,
};
