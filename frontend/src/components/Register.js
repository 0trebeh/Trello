import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: ''
    }

    onChangeUsername = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        await axios.post('http://localhost:4000/trello/users/register', newUser)
        window.location.href = '/login'
    }

    render() {
        return (
                <div className="col-md-4 mx-auto">
                    <div className="card card-body mt-5">
                        <h3>Register</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    value={this.state.username}
                                    type="text"
                                    name="username"
                                    onChange={this.onChangeUsername}
                                    placeholder="Username" 
                                    autoFocus
                                />
                                <input
                                    className="form-control"
                                    value={this.state.email}
                                    type="email"
                                    name="email"
                                    onChange={this.onChangeUsername}
                                    placeholder="Email" 
                                />
                                <input
                                    className="form-control"
                                    value={this.state.password}
                                    type="password"
                                    name="password"
                                    onChange={this.onChangeUsername}
                                    placeholder="Password" 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
        )
    }
}

export default Register