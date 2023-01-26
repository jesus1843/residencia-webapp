const express = require('express');
const router = express.Router();

const StreetsController = require('../../controllers/api/streets');
const HousesController = require('../../controllers/api/houses');


router.get('/', StreetsController.index);
router.get('/:streetId', StreetsController.show);
router.post('/', StreetsController.store);
router.put('/:streetId', StreetsController.update);
router.delete('/:streetId', StreetsController.delete);

router.get('/:streetId/houses', HousesController.index);
router.post('/:streetId/houses/multiple', HousesController.storeMultiple);
router.post('/:streetId/houses', HousesController.store);
router.get('/:streetId/houses/:number', HousesController.show);
router.put('/:streetId/houses/:number', HousesController.update);
router.delete('/:streetId/houses/:number', HousesController.delete);


module.exports = router;
