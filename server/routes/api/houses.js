const express = require('express');
const router = express.Router();

const HousesController = require('../../controllers/api/houses');


router.get('/', HousesController.index);
router.post('/multiple', HousesController.storeMultiple);
router.post('', HousesController.store);
router.get('/:number', HousesController.show);
router.put('/:number', HousesController.update);
router.delete('/:number', HousesController.delete);


module.exports = router;
