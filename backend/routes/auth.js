const express = require('express');
const router = express.Router();

// login Route
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
router.post('/new', (req, res) => res.send('reqister'));

module.exports = router;
