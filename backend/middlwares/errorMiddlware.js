const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode || 500;
	console.log(res.statusCode);
	res.status(statusCode);
	res.json({
		message: err.message,
		code: statusCode,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

module.exports = {
	errorHandler,
};
