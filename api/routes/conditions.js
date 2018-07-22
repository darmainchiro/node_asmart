const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ConditionsController = require('../controllers/conditions');

router.get('/', ConditionsController.conditions_get_all);

router.get('/current/',ConditionsController.conditions_current);

router.get('/volume', ConditionsController.conditions_volume);

router.post('/', ConditionsController.conditions_create);

router.get('/:conditionId', ConditionsController.conditions_get_item);

router.patch('/:conditionId', checkAuth, ConditionsController.conditions_update_item);

router.delete('/:conditionId', checkAuth, ConditionsController.conditions_delete_item);

module.exports = router;