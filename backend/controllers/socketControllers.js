const User = require('../models/usersModel');
const udpateUserSocketId = async (io, socket, userId) => {
	try {
		const user = await User.findByIdAndUpdate(userId, { socketId: socket.id });
		if (!user) {
			socket._error('No user was found');
		}
	} catch (error) {
		socket._error({ data: 'Invalid user ID' });
	}
};

module.exports = { udpateUserSocketId };
