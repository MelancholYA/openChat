const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		country: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
		friends: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true },
);
module.exports = mongoose.model('User', userSchema);
