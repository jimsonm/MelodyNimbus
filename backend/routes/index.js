// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// router.get('/hello/world', function (req, res) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.send('Hello World!');
// });

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });

router.use('/api', apiRouter);

module.exports = router;