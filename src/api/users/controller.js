const User = require('./model');
const { success, redirect } = require('../responses');

exports.index = function(req, res, next) {
  User.query()
    .orderBy('age', 'desc')
    .eager('posts')
    .then(function(data) {
      success(res, { users: data });
    }, next);
};

exports.show = function(req, res, next) {
  User.query()
    .findById(req.params.id)
    .eager('posts')
    .then(function(data) {
      success(res, data);
    }, next);
};

exports.new = function(req, res, next) {
  success(res);
};

exports.create = function(req, res, next) {
  User.query()
    .insert(req.body)
    .then(function() {
      redirect(res, 'users');
    }, next);
};

exports.edit = function(req, res, next) {
  User.query()
    .findById(req.params.id)
    .then(function(user) {
      success(res, user);
    }, next);
};

exports.update = function(req, res, next) {
  const id = req.params.id;
  User.query()
    .updateAndFetchById(id, req.body)
    .then(function(user) {
      redirect(res, `/users/${id}`);
    }, next);
};

exports.destroy = function(req, res, next) {
  User.query()
    .deleteById(req.params.id)
    .then(function() {
      redirect(res, '/users');
    }, next);
};
