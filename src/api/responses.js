exports.success = function(res, data) {
  res.status(200).json(data);
};

exports.error = function(res, message) {
  res.status(500).send(message);
};

exports.redirect = function(res, url) {
  res.redirect(url);
};
