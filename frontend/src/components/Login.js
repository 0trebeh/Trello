import React, { Component } from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { saveID, check } from '../redux/actions'

class Login extends Component {

    state = {
        _id: '',
        username: '',
        password: '',
    };

    onChangeUsername = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const logUser = {
            username: this.state.username,
            password: this.state.password
        }
        const user = await axios.post('http://localhost:4000/trello/users/login', logUser)
        if(user.status === 200){
            this.setState({ _id: user.data._id })
            this.props.saveID(user.data._id)            // MODIFICO EL ID DENTRO DEL ALMACEN
            this.props.check(true)

            window.location.href = '/perfil/'
        }
        if(user.status === 400){
            console.log('incorrect password')
        }
    }

    render() {
        return (
                <div className="col-md-4 mx-auto">
                    <div className="card card-body mt-5">
                        <h3>Login</h3>
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
                                    value={this.state.password}
                                    type="password"
                                    name="password"
                                    onChange={this.onChangeUsername}
                                    placeholder="Password" 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                login
                            </button>
                        </form>
                    </div>
                </div>
        )
    }
};

const mapStateToProps = (state)=> {
    return {
        Id: state.Id,
        checked: state.checked
    }
}

const mapDispatchToProps = {
    saveID: saveID,
    check: check
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)