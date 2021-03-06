const Rating = require('../models/Rating')
const User = require('../models/User');
const Service = require('../models/Service');
const HttpError = require('../error/http-error');

module.exports = { 
    async create(req, res, next) {
        try {    
            const { stars, description } = req.body;
            const userId = req.userId;
            const serviceId = req.params.serviceId;

            if (!await User.findById(userId)) {
                throw new HttpError('Usuário não cadastrado.', 403);
            }

            const service = await Service.findById(serviceId);

            if (!service) {
                throw new HttpError('Serviço não cadastrado.', 403);
            }
            
            let rating = await Rating.findOne({ stars, userId, description, serviceId })
            
            if (rating) {
                throw new HttpError('Essa avaliação já foi cadastrado', 409);
            }

            const count = await Rating.countDocuments({ serviceId })
            const conta = (( service.ratingMean * count ) + stars ) / (count + 1)
            service.ratingMean = parseFloat(conta.toFixed(1));
            await service.save();

            rating = await Rating.create({ ...req.body, userId: userId, serviceId: serviceId});

            return res.status(200).send({ rating });
        } catch (error) {
            if (!error instanceof HttpError) {
                error = new HttpError(error.message, 400);
            }
            return next(error);
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
    },
    async readAll(req, res, next) {
        try {
            const serviceId = req.params.serviceId;

            if (!await Service.findById(serviceId)) {
                throw new HttpError('Serviço não cadastrado.', 403);
            }

            const ratings = await Rating.find({ serviceId }).populate('userId');

            if (!ratings) {
                throw new HttpError('Nenhuma avaliação foi encontrada', 409);
            }

            return res.status(200).send({ ratings });
        } catch (error) {
            if (!error instanceof HttpError) {
                error = new HttpError(error.message, 400);
            }
            return next(error);
        }      
    }
}   