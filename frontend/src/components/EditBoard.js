import React, { Component } from 'react'
import axios from 'axios'

class NotesList extends Component {

    state = {
        lisTitle: '',
        titleBoard: '',
        titleLists:[],
        board: [],
        user: [],
        List: [],
        pos:[]
    }

    async componentDidMount() {
        this.getBoard()
    }

    async getBoard() {
        const res = await axios.get('http://localhost:4000/trello/board/' + this.props.match.params.id);
        this.setState({
            board: res.data,
            titleBoard: res.data.board,
            List: res.data.List
        });
    }

    async updateBoard () {
        const updatedData = {
            board: this.state.titleBoard,
            user: this.state.board.user,
            List: this.state.board.List
        }; 
        await axios.put('http://localhost:4000/trello/board/' + this.state.board._id, updatedData);

        this.getBoard()
    }

    newTask = e => {
        e.preventDefault();
        var pos = this.state.pos;

        this.state.board.List[pos].task.push(document.getElementById(pos).value)
        this.updateBoard()
        document.getElementById(pos).value = '';
    }

    newList = e => {
        e.preventDefault();
        this.state.board.List.push({"title": this.state.lisTitle, "task": []})
        this.updateBoard()
        this.setState({ lisTitle: '' })
    }

    pos = e => {
        this.setState({ pos: e })
    }

    deleteBoard = async e => {
        const response = window.confirm('You are sure to delete this board? All your lists and tasks are lost');
        if(response){
            await axios.delete('http://localhost:4000/trello/board/' + e)
            window.location.href = '/'
        }
    }

    deleteList = e => {
        const response = window.confirm('You are sure to delete this List? All your tasks are lost');
        if(response){
            this.state.board.List.splice(e, 1)
            this.updateBoard()
        }
    }

    deleteTask = (e) => {
        this.state.board.List[e[0]].task.splice(e[1], 1)
        this.updateBoard()
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="card card-body bg-dark">
            <div className="card-header d-flex justify-content-between mb-4 bg-light">
                <input
                type="text"
                className="form-control nigriti"
                placeholder="Title Board"
                onChange={this.onInputChange}
                name="titleBoard"
                value={this.state.titleBoard}
                required />

                <button className="btn btn-danger" onClick={() => this.deleteBoard(this.state.board._id)}>
                    Delete
                </button>
            </div>

            <div className="row">
                {
                    this.state.List.map((list, indexL) => (
                        <div className="col-md-4 p-2" key={indexL}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{list.title}</h5>
                                    <button className="btn btn-danger" onClick={() => this.deleteList(indexL)}>
                                        Delete
                                    </button>
                                </div>
                                <div className="card-body">
                                    {/* tasks */}
                                    <ul className="list-group">
                                        {
                                          list.task.map((task, indexT) => (
                                                <li className="list-group-item list-group-item-action" key={indexT}>
                                                <div className="d-flex justify-content-between ">
                                                    <textarea className="form-control" value={task}
                                                    required>
                                                    </textarea>
                                                    <button className="btn btn-secondary" 
                                                    onClick={() => this.deleteTask([indexL, indexT])}>
                                                        X
                                                    </button>
                                                </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="card card-body mt-2">
                                        <form onSubmit={this.newTask}>
                                            {/* Board task */}
                                            <div className="form-group">
                                                <textarea className="form-control" id={indexL} name="EditTask" 
                                                placeholder="content" required>
                                                </textarea> 
                                            </div>
                                            <div className="">
                                                <button className="btn btn-primary" onClick={() => this.pos(indexL)}>
                                                    New Task
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="col-md-4 mx-auto">
                    <div className="card card-body mt-5">
                        <form onSubmit={this.newList}>
                            {/* List Title */}
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    onChange={this.onInputChange}
                                    name="lisTitle"
                                    value={this.state.lisTitle}
                                    required />
                            </div>
                            <div className="">
                                <button className="btn btn-info">
                                    New List
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default NotesList