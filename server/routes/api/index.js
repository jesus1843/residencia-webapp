const express = require('express');
const router = express.Router();

const AuthMiddlewares = require('../../middlewares/auth');


router.get('/', (req, res) => {
    res.json(require('../../data/endpoints.json'));
});

router.use('/auth', require('./auth'));
router.use('/streets', [AuthMiddlewares.isAuthenticatedHeader], require('./streets'));


module.exports = router;
