const express = require('express');
const cors = require('cors');



const app = express();

app.use(cors());

require('http').Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(require('./routes'));



module.exports = app

