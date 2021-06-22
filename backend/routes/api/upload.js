const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Track } = require('../../db/models');
const { multiplePublicFileUpload, multipleMulterUpload } = require('../../awsS3');

const router = express.Router();

router.post(
    '/',
    restoreUser,
    requireAuth,
    multipleMulterUpload(['track', 'cover']),
    asyncHandler(async (req, res) => {
        let track_src;
        if (req.file) {
            track_src = await multiplePublicFileUpload(req.file)
        }
        const track = await Track.addTrack({ track_name, track_src, description, cover_art, user_id});
        
    })
)

module.exports = router;