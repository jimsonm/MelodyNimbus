const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
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
    singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, display_name } = req.body;
        const avatar_img = await singlePublicFileUpload(req.file);
        const user = await User.signup({ email, display_name, password, avatar_img });

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
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
        console.log('put route body', req.body);
        const avatar_img = await singlePublicFileUpload(req.file);
        const { display_name, image, first_name, last_name, city, country, bio, id } = req.body
        const user = await User.edit({ display_name, image, first_name, last_name, city, country, bio, id, avatar_img });
        return res.json(user);
    })
)
module.exports = router;