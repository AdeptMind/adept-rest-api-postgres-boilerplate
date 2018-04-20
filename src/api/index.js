const express = require('express');

const PostsRoute = require('./posts');
const UsersRoute = require('./users');

const router = express.Router();

router.get('/ping', (req, res) => res.send('pong'));

router.use('/posts', PostsRoute);
router.use('/users', UsersRoute);

module.exports = router;
