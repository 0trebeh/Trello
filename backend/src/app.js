const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const app = express();
require('./config/passport');

// settings
app.set('port', 4000);

// middlewares 
app.use(cors());
app.use(express.json());
app.use(session({ // a traves de estas configuraciones basicas express nos van a poder permitir autenticar el usuario y almacenar sus datos
	secret: 'contraseña.XD',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/trello', require('./routes/boards'));
app.use('/trello/users', require('./routes/users'));

module.exports = app;