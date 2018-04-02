const Post = require('./model');
const User = require('../users/model');
const { success, redirect } = require('../responses');

exports.index = function(req, res, next) {
  Post.query()
    .eager('user')
    .then(function(posts) {
      success(res, posts);
    }, next);
};

exports.show = function(req, res, next) {
  Post.query()
    .findById(req.params.id)
    .eager('user')
    .then(function(post) {
      success(res, post);
    }, next);
};

exports.create = function(req, res, next) {
  Post.query()
    .insertAndFetch(req.body)
    .eager('user')
    .then(function(post) {
      success(res, post);
    }, next);
};

exports.update = function(req, res, next) {
  Post.query()
    .updateAndFetchById(req.params.id, req.body)
    .eager('user')
    .then(function(post) {
      success(res, post);
    }, next);
};

exports.destroy = function(req, res, next) {
  Post.query()
    .findById(req.params.id)
    .then(function(post) {
      Post.query()
        .deleteById(req.params.id)
        .then(function() {
          success(res, post);
        });
    }, next);
};

// Non API user nested routes for associations
exports.newUser = function(req, res, next) {
  User.query()
    .findById(req.params.id)
    .then(function(user) {
      success(res, user);
    }, next);
};

exports.createUser = function(req, res, next) {
  const user_id = req.params.id;
  User.query()
    .findById(user_id)
    .then(function(user) {
      return user.$relatedQuery('posts').insert(req.body);
    })
    .then(function(post) {
      redirect(res, `/users/${user_id}`);
    }, next);
};
