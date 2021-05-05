const Rating = require('../models/Rating')
const User = require('../models/User');
const Service = require('../models/Service');
const HttpError = require('../error/http-error');

module.exports = { 
    async create(req, res) {
        try {    
            const { stars, description } = req.body;
            const userId = req.userId;
            const serviceId = req.params.serviceId;

            if (!await User.findById(req.userId)) {
                const error = new HttpError(
                    'Usuário não cadastrado.',
                    403
                );
                return next(error);
            }

            if (!await Service.findById(req.params.serviceId)) {
                const error = new HttpError(
                    'Serviço não cadastrado.',
                    403
                );
                return next(error);
            }
            
            const doc = await Rating.findOne({ stars, userId, description, serviceId })
            
            if (doc) {
                return res.status(409).send({ error: 'Duplicated rating' });
            }

            const rating = await Rating.create({ ...req.body, userId: userId, serviceId: serviceId});

            return res.status(200).send({ rating });
        } catch (error) {
            return res.status(400).send({ error: 'Some error ocurred' })
        }
    },

    async delete(req, res, next) {
        try {
            if (!await User.findById(req.userId)) {
                const error = new HttpError(
                    'Usuário não cadastrado.',
                    403
                );
                return next(error);
            }

            if (!await Service.findById(req.params.serviceId)) {
                const error = new HttpError(
                    'Serviço não cadastrado.',
                    403
                );
                return next(error);
            }

            const rating = await Rating.findById(req.params.ratingId);

            if (!rating) {
                const error = new HttpError(
                    'Avaliação não cadastrada.',
                    403
                );
                return next(error);
            }

            await Rating.findByIdAndDelete(rating._id);

            return res.send({ rating });
        }
        catch (err) {
            console.log(err)
            const error = new HttpError(
                'Falha ao deletar avaliação, tente novamente.',
                400
            );
            return next(error);
        }
    },

    async update(req, res, next) {
        try {
            if (!await User.findById(req.userId)) {
                throw new HttpError('Usuário não cadastrado.', 403);
            }

            if (!await Service.findById(req.params.serviceId)) {
                throw new HttpError('Serviço não cadastrado.', 403);
            }

            if (!await Rating.findById(req.params.ratingId)) {
                throw new HttpError('Avaliação não cadastrada.', 403);
            }

            const rating = await Rating.findByIdAndUpdate(req.params.ratingId, req.body, { new: true });

            return res.send({ rating });
        }
        catch (error) {
            if (!error instanceof HttpError) {
                error = new HttpError(error.message, 500);
            }
            return next(error);
        }
    }
}   