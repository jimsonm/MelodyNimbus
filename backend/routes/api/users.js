const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
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
    '/:id',
    asyncHandler(async (req, res) => {
        const user = await User.findByPk(req.params.id);
        console.log('got here');
        return res.json(user);
    }),
);

module.exports = router;