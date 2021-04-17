const express = require("express");
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');

const app = express();

app.use(express.json()); 
app.use(routes);
app.use(cors());
app.use(errors());

module.exports = app;