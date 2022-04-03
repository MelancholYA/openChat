const express = require('express');
const router = express.Router();
const { addUser, logUser } = require('../controllers/userController');

router.post('/', logUser);

router.post('/new', addUser);

module.exports = router;
