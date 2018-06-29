const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const CheckAuth = require('../middleware/check-auth');

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/:userId', CheckAuth, UserController.user_delete);

module.exports = router;