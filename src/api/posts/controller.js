const Post = require('./model');
const User = require('../users/model');
const { success, redirect } = require('../responses');

const index = async (req, res) => {
  const posts = await Post.query().eager('user');
  success(res, posts);
};

const show = async (req, res) => {
  const post = await Post.query().findById(req.params.id).eager('user');
  success(res, post);
};

const create = async (req, res) => {
  const post = await Post.query().insertAndFetch(req.body).eager('user');
  success(res, post);
};

const update = async (req, res) => {
  const post = await Post.query()
    .updateAndFetchById(req.params.id, req.body)
    .eager('user');
  success(res, post);
};

const destroy = async (req, res) => {
  const post = await Post.query().findById(req.params.id);
  await Post.query().deleteById(req.params.id);
  success(res, post);
};

const newUser = async (req, res) => {
  const user = await User.query().findById(req.params.id);
  success(res, user);
};

const createUser = async (req, res) => {
  const user_id = req.params.id;
  const user = await User.query().findById(user_id);
  await user.$relatedQuery('posts').insert(req.body);
  redirect(res, `/users/${user_id}`);
};

module.exports = {
  create,
  createUser,
  destroy,
  index,
  newUser,
  show,
  update,
};
