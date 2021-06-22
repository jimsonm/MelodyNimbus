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
    multipleMulterUpload('files'),
    asyncHandler(async (req, res) => {
        console.log('test 17')
        const { track_name, description, user_id } = req.body
        let track_src;
        let cover_art;
        console.log('request track-src', req.body.track_src)
        // console.log('req', req.file)
        const files = await multiplePublicFileUpload(req.files)
        console.log('files', files);
        track_src = files[0];
        cover_art = files[1];
        // if (req.file) {
        //     console.log('req', req.file)
        //     track_src = await multiplePublicFileUpload(req.file)
        //     console.log('track src', track_src)
        // }
        const track = await Track.addTrack({ track_name, track_src, description, cover_art, user_id });
        return res.json(track)
    }),
)

module.exports = router;