const express = require("express");
const morgan = require("morgan");
const path = require("path");

// const schema = require("./schema");
const { mongoose } = require("./database");

const app = express();

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/games', require('./routes/game.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Stating the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})