const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const HistoryController = require('../controllers/history');

router.get('/', HistoryController.history_get_all);

router.post('/', HistoryController.history_create);

router.get('/:historyId', HistoryController.history_get_item);

// router.patch('/:conditionId', checkAuth, ConditionsController.conditions_update_item);

// router.delete('/:conditionId', checkAuth, ConditionsController.conditions_delete_item);

module.exports = router;