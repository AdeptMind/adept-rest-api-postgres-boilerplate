const { getFailedPayload, getSuccessPayload } = require('../lib/adept-request');

const error = (res, message, status = 500) => {
  res.status(status).json(getFailedPayload(message));
};

const forbidden = (res, message) => {
  error(res, message, 403);
};

const notFound = (res, message) => {
  error(res, message, 404);
};

const redirect = (res, url) => {
  res.redirect(url);
};

const success = (res, data) => {
  res.status(200).json(getSuccessPayload(data));
};

module.exports = {
  error,
  forbidden,
  notFound,
  redirect,
  success,
};
