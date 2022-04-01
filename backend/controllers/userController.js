const deleteUser = (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error('invalid body');
	}
	res.status(200).send('user delted');
};
const editUser = (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(400);
		throw new Error('No id provided');
	}
	res.status(200).send('user edited');
};
const editUserPasword = (req, res) => {
	res.status(200).send('user password edited');
};

module.exports = { deleteUser, editUser, editUserPasword };
