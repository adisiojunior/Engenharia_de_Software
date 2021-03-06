require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");

const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(serviceRoutes);
app.use(ratingRoutes);
app.use(postRoutes);
app.use(ratingRoutes);
app.use(serviceRoutes);
app.use(userRoutes);
app.use(errors());

//error handler, should be able to catch all errors that are passed to next() functions
app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "Ocorreu um erro desconhecido" });
  //if theres no code or message, the error will return a standard response
});

module.exports = app;
