const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');

const { User, Track } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();

router.get(
    '/',
    restoreUser,
    asyncHandler(async (req, res) => {
        console.log('14', req.body);
        const user = await User.getCurrentUserById()
        res.json(user);
    })
)

module.exports = router;