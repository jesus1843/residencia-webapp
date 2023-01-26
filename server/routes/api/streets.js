const express = require('express');
const router = express.Router();

const StreetsController = require('../../controllers/api/streets');


router.get('/', StreetsController.index);
router.get('/:streetId', StreetsController.show);
router.post('/', StreetsController.store);
router.put('/:streetId', StreetsController.update);
router.delete('/:streetId', StreetsController.delete);

router.use('/:streetId/houses', require('./houses'));


module.exports = router;
