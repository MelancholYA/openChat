const User = require('../models/usersModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const deleteUser = asyncHandler(async (req, res) => {
	const { password } = req.body;
	const userId = req.user;
	if (!password) {
		res.status(400);
		throw new Error('Please provide your password');
	}
	const user = await User.findById(userId);
	const isSamePassword = await bcrypt.compare(password, user.password);
	if (!isSamePassword) {
		res.status(400);
		throw new Error('Wrong password');
	}
	try {
		await User.findByIdAndDelete(userId);
		res.status(201).json();
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

const editUser = asyncHandler(async (req, res) => {
	const userId = req.user;
	const newData = req.body;
	console.log(newData);
	if (newData.password) {
		res.status(400);
		throw new Error('You can not change the password this way');
	}
	delete newData.password;
	if (!newData || JSON.stringify(newData) === '{}') {
		res.status(400);
		throw new Error('No data was provided');
	}
	try {
		await User.findOneAndUpdate({ id: userId }, { ...newData });
		res.status(201).json();
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

const editUserPassword = asyncHandler(async (req, res) => {
	const userId = req.user;
	const { currPassword, newPassword } = req.body;
	if (!currPassword || !newPassword) {
		res.status(400);
		throw new Error('Please fill all the fields');
	}
	const user = await User.findById(userId);
	const isSamePassword = await bcrypt.compare(currPassword, user.password);
	if (!isSamePassword) {
		res.status(400);
		throw new Error('Wrong password');
	}
	const salt = await bcrypt.genSalt(7);
	const hashed = await bcrypt.hash(newPassword, salt);
	try {
		await User.findByIdAndUpdate(userId, { password: hashed });
		res.status(201).json();
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
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

module.exports = { deleteUser, editUser, editUserPassword, logUser, addUser };
