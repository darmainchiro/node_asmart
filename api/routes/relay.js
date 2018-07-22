const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const RelaysController = require('../controllers/relay');

router.get('/', RelaysController.relay_get_all);

router.post('/update_relay/motorpump', RelaysController.relay_Motor_update);

router.post('/update_relay/solenoid', RelaysController.relay_Solenoid_update);


// router.patch('/:conditionId', checkAuth, ConditionsController.conditions_update_item);

// router.delete('/:conditionId', checkAuth, ConditionsController.conditions_delete_item);

module.exports = router;