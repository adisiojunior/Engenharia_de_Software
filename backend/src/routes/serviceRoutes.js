const express = require("express")
const { celebrate, Segments, Joi } = require('celebrate');

const serviceController = require('../controllers/serviceController')
const authMiddleware = require('../middleware/auth');

const serviceRoutes = express.Router();

// When a error occurs, all erros are returned
const joiOpts = { abortEarly: false }

serviceRoutes.get('/services', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        category: Joi.array(),
        limit: Joi.number().min(1).max(15),
        offset: Joi.number().min(0).max(14),
    })
}, joiOpts), serviceController.read);

serviceRoutes.post('/services/register', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        category: Joi.array().required(),
        street: Joi.string().required(),
        neighborhood: Joi.string().required(),
        description: Joi.string().required(),
        slogan: Joi.string(),
        cnpj: Joi.string(),
        image: Joi.string(),
        instagram: Joi.string(),
        whatsapp: Joi.string(),
        email: Joi.string().email(),
    }, )
}, joiOpts ), authMiddleware, serviceController.create);

serviceRoutes.delete('/services/delete/:serviceId', authMiddleware, serviceController.delete);

module.exports = serviceRoutes;