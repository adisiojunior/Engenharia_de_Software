const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate');

const ratingController = require('../controllers/ratingController')

const ratingRouter = Router();

const celebrateWithJoiOptions = (schema) => {
    const joiOpts = { abortEarly: false }
    return celebrate(schema, joiOpts)
}

// Regex for _id of MongoDB document
const objectIdRegex = new RegExp('^[0-9a-fA-F]{24}$');

ratingRouter.post('/ratings', celebrateWithJoiOptions({
    [Segments.BODY]: Joi.object().keys({
        stars: Joi.number().integer().min(1).max(5).required(),
        description: Joi.string(),
        userId: Joi.string().pattern(objectIdRegex).required(),
        serviceId: Joi.string().pattern(objectIdRegex).required(),
    })
}), ratingController.create);

module.exports = ratingRouter;