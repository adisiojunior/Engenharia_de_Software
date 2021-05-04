const Service = require('../models/Service');
const HttpError = require("../error/http-error");
const User = require('../models/User');
require('dotenv/config');

module.exports = {

    async create(req, res) {
        try {

            const user = await User.findById(req.userId).select('+password')   

            if (await Service.findOne({ name: req.name, street: req.street })) {
                return res.status(409).send({ error: `Serviço já existente` });
            }

            const service = await Service.create(req.body);
            
            user.services.push(service._id);
            user.save();

            return res.send({
                service
            });

        }
            catch (err) {
                return res.status(400).send({ error: 'Falha no cadastro do serviço ou comércio.' });
            }        
        
    },

    async delete(req, res, next) {
        try {
            const user = await User.findById(req.userId).select('+password');

            if (!user) {
                const error = new HttpError(
                    "Usuário não existe.",
                    404,
                );
                return next(error);
            }

            const serviceId = req.params.serviceId;

            if (!user.services.includes(req.params.serviceId)) {
                const error = new HttpError(
                    "Tarefa não cadastrada.",
                    400
                );
                return next(error);
            }

            user.services.splice(user.services.indexOf(serviceId), 1);
            user.save();

            const service = await Service.findByIdAndDelete(serviceId);

            return res.send({ service });
        }
        catch (err) {
            const error = new HttpError(
                "Falha ao deletar serviço ou comércio.",
                400
            );
            return next(error);
        }
    },
    async read (req, res, next) {
        const { limit = 0, offset = 0, category } = req.query;

        try {
            let results = await Service.find({ category });

            if (!results) {
                throw new HttpError("Não foi encontrado nenhum serviço", 404);
            }

            if (offset > results.length) {
                throw new HttpError("O valor de offset é maior que os resultados encontrados", 406)
            }

            results = results.slice(offset);

            if (limit > 0) {
                results = results.slice(0, limit);
            }
            
            return res.status(200).send(results);
        } catch (error) {
            if (! error instanceof HttpError) {
                error = new HttpError(error.message, 500); 
            }
            return next(error);
        }

    }
}