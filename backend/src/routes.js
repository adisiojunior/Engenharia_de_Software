const express = require("express")
const userController = require('./controllers/userController');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

routes.post('/register', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        birthDay: Joi.date().required()
    })
}), userController.create);

module.exports = routes;