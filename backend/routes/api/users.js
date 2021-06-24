const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Track } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('display_name')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a display_name with at least 4 characters.'),
    check('display_name')
        .not()
        .isEmail()
        .withMessage('display_name cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, display_name } = req.body;
        const user = await User.signup({ email, display_name, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

router.get(
    '',
    asyncHandler(async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    })
)

router.get(
    '/:id',
    restoreUser,
    asyncHandler(async (req, res) => {
        console.log('bodyyyyyyyyyyyyy', req.body);
        const user = await User.getCurrentUserById(req.params.id);
        console.log('userrrrrrrrrrrrr', user)
        // console.log('===========', res.json(user))
        console.log('get /:id')
        return res.json(user);;
    }),
);

router.put(
    '/:id',
    restoreUser,
    requireAuth,
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
        await User.getCurrentUserById(req.params.id);
        console.log('put route body', req.body);
        let avatar_img;
        if (req.file) {
            avatar_img = await singlePublicFileUpload(req.file)
        };
        const { display_name, image, first_name, last_name, city, country, bio, id} = req.body
        const updatedUser = await User.edit({ display_name, image, first_name, last_name, city, country, bio, id, avatar_img });
        return res.json(updatedUser);
    })
)

router.put(
    '/:id/header',
    restoreUser,
    requireAuth,
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
        await User.getCurrentUserById(req.params.id);
        console.log('put route body', req.body);
        let header_img;
        if (req.file) {
            header_img = await singlePublicFileUpload(req.file)
        };
        const { display_name, image, first_name, last_name, city, country, bio, id } = req.body
        const updatedUser = await User.edit({ display_name, image, first_name, last_name, city, country, bio, id, header_img });
        return res.json(updatedUser);
    })
)

router.put(
    '/:id/defaultAvatar',
    restoreUser,
    requireAuth,
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
        await User.getCurrentUserById(req.params.id);
        console.log('put route body', req.body);
        const avatar_img = 'https://melody-nimbus.s3.us-west-1.amazonaws.com/default-avatar-image.webp'
        const { display_name, image, first_name, last_name, city, country, bio, id} = req.body
        const updatedUser = await User.edit({ display_name, image, first_name, last_name, city, country, bio, id, avatar_img });
        return res.json(updatedUser);
    })
)

router.put(
    '/:id/defaultHeader',
    restoreUser,
    requireAuth,
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
        await User.getCurrentUserById(req.params.id);
        console.log('put route body', req.body);
        const header_img = 'https://melody-nimbus.s3.us-west-1.amazonaws.com/default-background-image.jpeg'
        const { display_name, image, first_name, last_name, city, country, bio, id} = req.body
        const updatedUser = await User.edit({ display_name, image, first_name, last_name, city, country, bio, id, header_img });
        return res.json(updatedUser);
    })
)

router.put(
    '/:id/:track_name',
    restoreUser,
    requireAuth,
    singleMulterUpload('file'),
    asyncHandler(async (req, res) => {
        console.log('step 3');
        const { track_src, track_name, description, user_id } = req.body
        let cover_art;
        if(req.file) {
            cover_art = await singlePublicFileUpload(req.file);
        }
        await Track.getTrackByName(req.params.track_name)
        const updatedTrack = await Track.edit({ track_src, track_name, description, user_id, cover_art });
        return res.json(updatedTrack);
    })
)

router.get(
    '/:id/tracks',
    restoreUser,
    asyncHandler(async (req, res) => {
        const userId = req.params.id
        const tracks = await Track.findAll({
            where: {
                'user_id': userId
            }
        });
        return res.json(tracks);
    })
)
module.exports = router;