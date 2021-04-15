const express = require("express")
const userController = require('./controllers/userController');

const routes = express.Router();

routes.get('/', userController.test);

module.exports = routes;