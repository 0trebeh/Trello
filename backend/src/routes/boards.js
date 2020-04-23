const { Router } = require('express');
const router = Router();

const { getBoards,
		createBoard,
		getBoard,
		deleteBoard,
		updateBoard } = require('../controllers/notes.controller');

router.route('/board')
    .get(getBoards)
    .post(createBoard);

router.route('/board/:id')
    .get(getBoard)
    .delete(deleteBoard)
    .put(updateBoard);

module.exports = router;


