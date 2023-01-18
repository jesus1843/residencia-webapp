const { body } = require('express-validator');


module.exports.loginValidator = [
    body('email')
        .isString().withMessage('must be a string value')
        .isEmail().withMessage('must be a valid e-mail'),
    body('password')
        .isString().withMessage('must be a string value')
        .isLength({ min: 8 }).withMessage('must be at least 5 chars long'),
];
