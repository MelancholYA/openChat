const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const chat = require('../models/chatModel');

const getChats = asyncHandler(async (req, res) => {
	try {
		let chats = await chat.find({ users: req.user }).select('name , updatedAt');
		res.json(chats);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

const newChat = asyncHandler(async (req, res) => {
	const { recipients, messages } = req.body;
	if (!recipients || recipients.length < 1) {
		res.status(400);
		throw new Error('please select at least one recipient');
	}
	const users = [req.user, ...recipients];
	try {
		await chat.create({
			users,
			name: '',
			messages,
		});

		res.status(201).json();
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

module.exports = { getChats, newChat };
