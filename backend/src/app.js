const express = require("express");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { errors } = require('celebrate');

const app = express();

app.use(express.json()); 
app.use(userRoutes);
app.use(cors());
app.use(errors());

module.exports = app;