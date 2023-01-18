const express = require('express');
const router = express.Router();

const AuthValidators = require('../../validators/auth');
const AuthController = require('../../controllers/api/auth');


router.post('/login', ...AuthValidators.loginValidator, AuthController.login);


module.exports = router;
