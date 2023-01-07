const express = require('express');
const router = express.Router();

const AuthController = require('../../controllers/api/auth');


router.post('/login', AuthController.login);


module.exports = router;
