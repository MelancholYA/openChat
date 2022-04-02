const User = require('../models/usersModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const deleteUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error('invalid body');
	}
	res.status(200).send('user delted');
});

const editUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(400);
		throw new Error('No id provided');
	}
	res.status(200).send('user edited');
});

const editUserPasword = asyncHandler(async (req, res) => {
	res.status(200).send('user password edited');
});

const addUser = asyncHandler(async (req, res) => {
	let { name, email, password, country } = req.body;
	if (!email || !name || !password || !country) {
		res.status(400);
		throw new Error('Please fill all the fields');
	}
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error('User already exists , please login');
	}

	// hashing
	const salt = await bcrypt.genSalt(7);
	const hashedPassword = await bcrypt.hash(password, salt);

	let user = await User.create({
		name,
		email,
		password: hashedPassword,
		country,
	});
	if (user) {
		const token = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET,
		);
		res.status(201).send({ token });
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

const logUser = asyncHandler(async (req, res) => {
	let { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error('Please fill all the fields');
	}
	const user = await User.findOne({ email });
	if (!user) {
		res.status(400);
		throw new Error("User doesn't exists , please register");
	}

	const isSamePassword = await bcrypt.compare(password, user.password);

	if (!isSamePassword) {
		res.status(400);
		throw new Error('Wrong password');
	} else {
		const token = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET,
		);
		res.status(200).json({ token });
	}
});

module.exports = { deleteUser, editUser, editUserPasword, addUser };
