const express = require("express");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { errors } = require('celebrate');
const serviceRoutes = require('./routes/serviceRoutes');


const app = express();

app.use(express.json()); 
app.use(userRoutes);
app.use(serviceRoutes);
app.use(cors());
app.use(errors());


module.exports = app;