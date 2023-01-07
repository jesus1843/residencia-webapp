const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.json(require('../../data/endpoints.json'));
});

router.use('/auth', require('./auth'));
router.use('/streets', require('./streets'));


module.exports = router;
