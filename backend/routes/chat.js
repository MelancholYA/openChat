const express = require('express');
const router = express.Router();

const protect = require('../middlwares/authMidllware');
const {
	getChats,
	newChat,
	reNameChat,
	addToChat,
} = require('../controllers/chatController');

router.get('/history', protect, getChats);
router
	.route('/')
	.put(protect, reNameChat)
	.post(protect, newChat)
	.patch(protect, addToChat);

module.exports = router;
