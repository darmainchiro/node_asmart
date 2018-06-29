const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const RelaysController = require('../controllers/relay');

router.get('/', RelaysController.relay_get_all);

router.post('/', RelaysController.relay_create);


// router.patch('/:conditionId', checkAuth, ConditionsController.conditions_update_item);

// router.delete('/:conditionId', checkAuth, ConditionsController.conditions_delete_item);

module.exports = router;