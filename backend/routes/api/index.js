const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const uploadRouter = require('./upload.js');
const commentRouter = require('./comments.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use ('/upload', uploadRouter);

router.use('/comments', commentRouter);

module.exports = router;