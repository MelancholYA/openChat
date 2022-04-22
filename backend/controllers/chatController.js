const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const Chat = require('../models/chatModel');
const User = require('../models/usersModel');

const getChats = asyncHandler(async (req, res) => {
	try {
		let chats = await Chat.find({ users: req.user }).select(
			'name , updatedAt , latestMessage',
		);
		res.json(chats);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

const newChat = asyncHandler(async (req, res) => {
	const { recipients, message } = req.body;
	if (!recipients || recipients.length < 1) {
		res.status(400);
		throw new Error('please select at least one recipient');
	}
	if (!message) {
		res.status(400);
		throw new Error("Message can'n be empty");
	}
	const users = await User.find({
		_id: { $in: [req.user, ...recipients] },
	}).select('name _id');
	const names = users.map((user) => user.name);
	const ids = users.map((user) => user._id);
	try {
		await Chat.create({
			users: ids,
			name: names.join(' , '),
			messages: [
				{
					message,
					user: req.user,
				},
			],
			latestMessage: message,
		});
		res.status(201).json();
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

const addToChat = asyncHandler(async (req, res) => {
	const { newMessage, chatId } = req.body;
	res.status(400);
	if (!newMessage) {
		throw new Error("Message can't be empty");
	}
	if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
		throw new Error('Please provide a valid  chat ID');
	}

	try {
		let chat = await Chat.findByIdAndUpdate(chatId, {
			$push: {
				messages: {
					message: newMessage,
					user: req.user,
				},
			},
			latestMessage: newMessage,
		});
		if (chat) {
			res.status(200).json();
		} else {
			res.status(400);
			throw new Error('No chat was found with this ID');
		}
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

const reNameChat = asyncHandler(async (req, res) => {
	const { newName, chatId } = req.body;
	if (!newName) {
		res.status(400);
		throw new Error('No name was provided');
	}
	if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
		res.status(400);
		throw new Error('Please provide a valid chat id');
	}

	try {
		let chat = await Chat.findByIdAndUpdate(
			chatId,
			{ name: newName },
			{ new: true },
		).select('name _id');
		if (chat) {
			res.status(200).json(chat);
		} else {
			res.status(400);
			throw new Error('No chat was found with this id');
		}
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

module.exports = { getChats, newChat, reNameChat, addToChat };
