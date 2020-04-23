const notesCtrl = {};

const Board = require('../models/Board');

notesCtrl.getBoards = async (req, res) => {
    const boards = await Board.find();
    res.json(boards);
};

notesCtrl.createBoard = async (req, res) => {
    const { board, user, List } = req.body;
    const newBoard = new Board({
        board,
        user,
        List
    });
    await newBoard.save();
    res.json('New Board added');
};

notesCtrl.getBoard = async (req, res) => {
    const board = await Board.findById(req.params.id);
    res.json(board);
}

notesCtrl.deleteBoard = async (req, res) => {
    await Board.findByIdAndDelete(req.params.id)
    res.json('Board Deleted');
}

notesCtrl.updateBoard = async (req, res) => {
    const { board, user, List } = req.body;
    await Board.findByIdAndUpdate(req.params.id, {
        board, 
        user, 
        List
    });
    res.json('Board Updated');
}

module.exports = notesCtrl;