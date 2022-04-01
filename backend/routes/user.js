const express = require('express');
const router = express.Router();
const {
	deleteUser,
	editUser,
	editUserPasword,
} = require('../controllers/userController');

router.delete('/', deleteUser);
router.put('/:id', editUser);
router.put('/password', editUserPasword);

module.exports = router;
