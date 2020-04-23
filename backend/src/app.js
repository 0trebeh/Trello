const express = require('express');
const cors = require('cors');

const app = express();

// settings
app.set('port', 4000);

// middlewares 
app.use(cors());
app.use(express.json());

// routes
app.use('/trello', require('./routes/boards'));
app.use('/trello/users', require('./routes/users'));

module.exports = app;