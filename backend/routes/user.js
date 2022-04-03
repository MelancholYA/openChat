const express = require('express');
const router = express.Router();
const {
	deleteUser,
	editUser,
	editUserPassword,
} = require('../controllers/userController');
const protect = require('../middlwares/authMidllware');

router.delete('/', protect, deleteUser);
router.put('/password', protect, editUserPassword);
router.put('/', protect, editUser);

module.exports = router;
