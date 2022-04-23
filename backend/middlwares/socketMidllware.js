const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const protectSocket = async (socket, next) => {
	const token = socket.handshake.auth.token;
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById(decoded.id).select(
				'name id picture friends',
			);
			socket.user = user;
			next();
		} catch (error) {
			return next(new Error('Not authorized , Invalid token'));
		}
	} else {
		return next(new Error('Not authorized , no token was provided'));
	}
};

module.exports = { protectSocket };
