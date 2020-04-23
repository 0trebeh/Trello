const { Router } = require('express');
const router = Router();

const { getUser, 
		getUsers, 
		register, 
		login, 
		deleteUser, 
		updateUser } = require('../controllers/users.controller');

router.route('/register')
    .post(register);

router.route('/login')
    .post(login);

router.route('/:id')
	.get(getUser)
	.put(updateUser)
    .delete(deleteUser);

module.exports = router;
