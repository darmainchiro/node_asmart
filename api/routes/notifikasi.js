const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const NotifController = require('../controllers/notifikasi');

router.get('/', NotifController.notifikasi_get_all);

router.post('/', NotifController.notifikasi_create);

router.get('/:tokenId', NotifController.notifikasi_get_item);

// router.patch('/:conditionId', checkAuth, ConditionsController.conditions_update_item);

// router.delete('/:conditionId', checkAuth, ConditionsController.conditions_delete_item);

module.exports = router;