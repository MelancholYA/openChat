const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose
			.connect(process.env.MONGO_URI)
			.then((res) => console.log('DB connected to host' + res.connection.host));
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
module.exports = connectDB;
