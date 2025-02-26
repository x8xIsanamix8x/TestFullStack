require('dotenv').config();
const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require('cors');

const app = express();

dbConnection();


app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/evaluations', require('./routes/evaluations'));
app.use('/api/feedback', require('./routes/feedbacks'));
app.use('/api/reports', require('./routes/reports'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;
