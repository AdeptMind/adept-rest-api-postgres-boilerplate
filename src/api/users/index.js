const express = require('express');
const router = express.Router();

const users = require('./controller');

router
  .get('/', users.index)
  .get('/new', users.new)
  .post('/', users.create)
  .get('/:id', users.show)
  .get('/:id/edit', users.edit)
  .put('/:id', users.update)
  .delete('/:id', users.destroy);

module.exports = router;
