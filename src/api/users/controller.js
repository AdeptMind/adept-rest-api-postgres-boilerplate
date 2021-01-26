const User = require('./model');
const { success, redirect } = require('../responses');

const index = async (req, res) => {
  const data = await User.query().orderBy('age', 'desc').eager('posts');
  success(res, { users: data });
};

const show = async (req, res) => {
  const data = await User.query().findById(req.params.id).eager('posts');
  success(res, data);
};

const create = async (req, res) => {
  await User.query().insert(req.body);
  redirect(res, 'users');
};

const edit = async (req, res) => {
  const user = await User.query().findById(req.params.id);
  success(res, user);
};

const update = async (req, res) => {
  const id = req.params.id;
  await User.query().updateAndFetchById(id, req.body);
  redirect(res, `/users/${id}`);
};

const destroy = async (req, res) => {
  await User.query().deleteById(req.params.id);
  redirect(res, '/users');
};

module.exports = {
  create,
  destroy,
  edit,
  index,
  show,
  update,
};
