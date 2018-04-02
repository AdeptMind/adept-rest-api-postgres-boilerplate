const express = require('express');
const router = express.Router();

const posts = require('./controller');

router
  .get('/', posts.index)
  .post('/', posts.create)
  .get('/:id', posts.show)
  .put('/:id', posts.update)
  .delete('/:id', posts.destroy);

module.exports = router;
