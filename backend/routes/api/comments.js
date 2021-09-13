const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Track_Comment } = require('../../db/models')

const router = express.Router();

router.get(
    '',
    asyncHandler(async (req, res) => {
        const comments = await Track_Comment.findAll();
        return res.json(comments);
    })
)

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const comments = await Track_Comment.findAll({
            where: {
                track_id: req.params.id
            }
        });
        return res.json(comments);
    })
)

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { track_id, user_id, comment } = req.body;
        console.log('postzzzzzzzzzzz', req.body)
        const newComment = await Track_Comment.create({
            track_id,
            user_id,
            response_text: comment
        });
        return res.json(newComment);
    })
)

module.exports = router;