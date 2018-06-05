const express = require('express');

const Controller = require('./controller');
const PostsRoute = require('./posts');
const UsersRoute = require('./users');

const router = express.Router();

router.get('/ping', Controller.ping);

router.use('/posts', PostsRoute);
router.use('/users', UsersRoute);

module.exports = router;
