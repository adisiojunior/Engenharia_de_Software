const express = require("express");
const cors = require('cors');
const { errors } = require('celebrate');

const userRoutes = require('./routes/userRoutes');
const ratingRoutes = require('./routes/ratingRoutes')

const app = express();

app.use(express.json()); 
app.use(userRoutes);
app.use(ratingRoutes);
app.use(cors());
app.use(errors());

module.exports = app;