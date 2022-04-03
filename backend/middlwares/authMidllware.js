const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protect = (req, res, next) => {
	let token = req.headers['x-auth-token'];
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded.id;
			next();
		} catch (error) {
			res.status(401);
			throw new Error(error);
		}
	} else {
		res.status(401);
		throw new Error('Not authorized , no token was provided');
	}
};

module.exports = protect;
