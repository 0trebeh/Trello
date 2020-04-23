import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class Perfil extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        _id: '',
        newpassword: '',
        currentPassword: '',
       // checked: false
    }

    getUser = async () => {
        const res = await axios.get('http://localhost:4000/trello/users/' + this.props.Id)
        this.setState({
            username: res.data.name,
            email: res.data.email,
            password: res.data.password,
            _id: res.data._id
        })
    }

    async componentDidMount() {
        console.log(this.props.checked)
        this.getUser();
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const editUser = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.newpassword.value,
           // currentPassword: 
        }
        await axios.put('http://localhost:4000/trello/users/'+this.state._id, editUser)
        this.getUser()
    }

    delete = async e => {
        const response = window.confirm('are you sure to want to delete the user?')
        if(response){
            await axios.delete('http://localhost:4000/trello/users/' + e)
            window.location.href = '/'
        }else{
           this.getUser()
           this.setState({ currentPassword: '' })
        }
    }

    onInputChange = async e => {
        
        await this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <div className="col-md-4 mx-auto">
                <div className="card card-body mt-5">
                    <h4 className="mb-3">Perfil</h4>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                onChange={this.onInputChange}
                                name="username"
                                value={this.state.username}
                                required />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={this.onInputChange}
                                name="email"
                                value={this.state.email}
                                required />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="**********"
                                onChange={this.onInputChange}
                                name="newpassword" 
                                value={this.state.newpassword}
                                />
                        </div>
                        <div className="form-group pt-3">
                            <input
                            type="password"
                            className="form-control"
                            placeholder="Current Password"
                            onChange={this.onInputChange}
                            name="currentPassword" 
                            value={this.state.currentPassword}
                            required/>
                        </div>
                        <button className="btn btn-primary mt-2" name="Update" >
                            Update 
                        </button>
                        <input
                            type="button"
                            className="btn btn-danger ml-4 mt-2"
                            onClick={() => this.delete(this.state._id)}
                            value="Delete"
                            name="Delete" />
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        Id: state.Id,
        checked: state.checked
    }
}

export default connect(mapStateToProps)(Perfil)