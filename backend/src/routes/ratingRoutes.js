const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate');

const authMiddleware = require('../middleware/auth') 
const ratingController = require('../controllers/ratingController')

const ratingRouter = Router();

const celebrateWithJoiOptions = (schema) => {
    const joiOpts = { abortEarly: false }
    return celebrate(schema, joiOpts)
}

const objectIdRegex = new RegExp('^[0-9a-fA-F]{24}$');

ratingRouter.get('/services/:serviceId/ratings', celebrateWithJoiOptions({
    [Segments.PARAMS] : Joi.object().keys({
        serviceId: Joi.string().pattern(objectIdRegex).required()
    })
}), ratingController.readAll)

ratingRouter.post('/services/:serviceId/ratings', celebrateWithJoiOptions({
    [Segments.PARAMS] : Joi.object().keys({
        serviceId: Joi.string().pattern(objectIdRegex).required()
    }),
    [Segments.BODY]: Joi.object().keys({
        stars: Joi.number().integer().min(1).max(5).required(),
        description: Joi.string(),
    })
}), authMiddleware, ratingController.create);

ratingRouter.put('/services/:serviceId/ratings/:ratingId', authMiddleware, ratingController.update);

ratingRouter.delete('/services/:serviceId/ratings/:ratingId', celebrateWithJoiOptions({
    [Segments.PARAMS]: Joi.object().keys({
        serviceId: Joi.string().pattern(objectIdRegex).required(),
        ratingId: Joi.string().pattern(objectIdRegex).required(),
    })
}), authMiddleware, ratingController.delete);

module.exports = ratingRouter;