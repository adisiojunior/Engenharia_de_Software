const express = require("express")
const serviceController = require('../controllers/serviceController')
const { celebrate, Segments, Joi } = require('celebrate');
const authMiddleware = require('../middleware/auth');

const serviceRoutes = express.Router();
serviceRoutes.use('/services', authMiddleware);

// When a error occurs, all erros are returned
const joiOpts = { abortEarly: false }

serviceRoutes.post('/services/register', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        category: Joi.array().required(),
        street: Joi.string().required(),
        neighborhood: Joi.string().required(),
        description: Joi.string().required(),
        slogan: Joi.string(),
        cnpj: Joi.string(),
        image: Joi.string()
    }, )
}, joiOpts ), serviceController.create);

module.exports = serviceRoutes;