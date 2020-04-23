import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class BoardList extends Component {

    state = {
        board: '',
        boards: []
    }

    async componentDidMount() {
        this.getBoars()
    }

    getBoars = async () => {
        const res = await axios.get('http://localhost:4000/trello/board')

        this.setState({
            boards: res.data
        })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const newBoard = {
            user: 'PRUEBA',
            board: this.state.board
        };
        await axios.post('http://localhost:4000/trello/board', newBoard)
        this.setState({
            board: ''
        })
        this.getBoars();
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    addBoard() {
        return (
            <div className="col-md-4 mx-auto">
                    <div className="card card-body mt-5">
                        <form onSubmit={this.onSubmit}>
                            {/* Board Title */}
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    onChange={this.onInputChange}
                                    name="board"
                                    value={this.state.board}
                                    required />
                            </div>
                            <div className="">
                                <button className="btn btn-primary">
                                    New Board
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        )
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.boards.map(board => (
                        <div className="col-md-4 p-2" key={board._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{board.board}</h5>
                                    <Link to={"/board/" + board._id} className="btn btn-secondary">
                                        View -->[]
                                    </Link>
                                </div>
                                <div className="card-body">
                                {/* List Title */}
                                {
                                    board.List.map((list, index) => (
                                    <ul className="list-group" key={board._id + index}>
                                        <li className="list-group-item list-group-item-action">
                                            {list.title}
                                        </li>
                                    </ul>
                                    ))
                                }
                                </div>
                            </div>
                        </div>
                    ))
                }
                {   /*Formulario para newBoard*/  }
                {   this.addBoard()  }
            </div>
        )
    }
}

export default BoardList