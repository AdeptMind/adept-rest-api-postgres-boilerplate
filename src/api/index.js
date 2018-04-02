const express = require('express');
const router = express.Router();

const posts = require('./posts');
const users = require('./users');

router.get('/ping', (req, res) => res.send('pong'));

router.use('/posts', posts);
router.use('/users', users);

module.exports = router;
