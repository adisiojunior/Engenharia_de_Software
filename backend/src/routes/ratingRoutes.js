const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate');

const authMiddleware = require('../middleware/auth') 
const ratingController = require('../controllers/ratingController')

const ratingRouter = Router();

const celebrateWithJoiOptions = (schema) => {
    const joiOpts = { abortEarly: false }
    return celebrate(schema, joiOpts)
}

// The routes after that will be private routes
ratingRouter.use(authMiddleware);

ratingRouter.post('/ratings/:serviceId', celebrateWithJoiOptions({
    [Segments.BODY]: Joi.object().keys({
        stars: Joi.number().integer().min(1).max(5).required(),
        description: Joi.string(),
    })
}), ratingController.create);

ratingRouter.delete('/ratings/delete/:serviceId/:ratingId', ratingController.delete);

module.exports = ratingRouter;