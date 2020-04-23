import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveID, check } from '../redux/actions'

class Navigation extends Component {

    logout(){
        this.props.saveID('')
        this.props.check(false)
        window.location.href = '/login/'
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <h2>Trello</h2>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav ml-auto">

                        {   !this.props.checked ? (

                            <div className="navbar-nav">
                                <li className="nav-item active ml-auto">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                                <li className="nav-item active ml-auto">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                            </div>

                            ) : (

                            <div className="navbar-nav">
                                <li className="nav-item active ml-auto">
                                    <Link to="/" className="nav-link">tablas</Link>
                                </li>
                                <li className="nav-item active ml-auto">
                                    <Link to="/perfil/" className="nav-link">Perfil</Link>
                                </li>
                                <li className="nav-item active ml-auto pl-5">
                                    <input type="button" 
                                    className="btn text-white"
                                    onClick={() => this.logout()} 
                                    value="logout ->[]" />
                                </li>
                            </div>
                            )
                        }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        Id: state.Id,
        checked: state.checked
    }
}

const mapDispatchToProps = {
    saveID,
    check
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)