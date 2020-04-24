import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

//import $ from 'jquery'
//import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import BoardList from './components/BoardList'
import register from './components/Register'
import login from './components/Login'
import perfil from './components/Perfil'
import EditBoard from './components/EditBoard'
import home from './components/Home'

import './public/css/App.css'

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component= {home} />
        <Route path="/boards" component= {BoardList} />
        <Route path="/board/:id" component= {EditBoard} />
        <Route path="/register" component= {register} />
        <Route path="/login" component= {login} />
        <Route path="/perfil/" component= {perfil} />
      </div>
    </Router>
  )
}

export default App
