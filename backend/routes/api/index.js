const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const uploadRouter = require('./upload.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use ('/upload', uploadRouter);

module.exports = router;