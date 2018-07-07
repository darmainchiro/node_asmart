const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const WaterController = require('../controllers/water');

router.get('/', WaterController.water_get_all);

router.post('/', WaterController.water_create);

router.get('/:waterId', WaterController.water_get_item);

// router.patch('/:conditionId', checkAuth, ConditionsController.conditions_update_item);

// router.delete('/:conditionId', checkAuth, ConditionsController.conditions_delete_item);

module.exports = router;