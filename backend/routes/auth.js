const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/userController');

// login Route
// body :{email,password}
// response : token
router.post('/', (req, res) => {
	let { email, password } = req.body;
	if (!email) {
		res.status(400);
		throw new Error('No email provided');
	}
	if (!password) {
		res.status(400);
		throw new Error('No password provided');
	}
	res.status(200).send('welcome bitch');
});

// register Route
// body :{name,email,password,country}
// response : token
router.post('/new', addUser);

module.exports = router;
