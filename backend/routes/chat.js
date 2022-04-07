const express = require('express');
const router = express.Router();

const protect = require('../middlwares/authMidllware');
const { getChats, newChat } = require('../controllers/chatController');

router.get('/history', protect, getChats);
router.post('/', protect, newChat);

module.exports = router;
