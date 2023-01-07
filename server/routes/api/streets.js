const express = require('express');
const router = express.Router();

const StreetsController = require('../../controllers/api/streets');


router.get('/', StreetsController.index);


module.exports = router;
