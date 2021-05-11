const Service = require("../models/Service");
const multer = require("multer");
const HttpError = require("../error/http-error");
const User = require("../models/User");
const { SecretsManager } = require("aws-sdk");
const Post = require("../models/Post");
const {
  Types: { ObjectId },
} = require("mongoose");
require("dotenv/config");

module.exports = {
  async create(req, res) {
    try {
      const user = await User.findById(req.userId).select("+password");

      if (await Service.findOne({ name: req.name, street: req.street })) {
        return res.status(409).send({ error: `Serviço já existente` });
      }

      const service = await Service.create(req.body);

      user.services.push(service._id);
      user.save();
      console.log(service._id);
      return res.send({
        service,
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Falha no cadastro do serviço ou comércio." });
    }
  },
  async getServiceById(req, res, next) {
    const serviceId = req.params.sid;
    const userId = req.userId;

    console.log(req);

    console.log(userId);
    try {
      let service = await Service.findById(serviceId);

      if (!service) {
        throw new HttpError(
          "Não foi possível encontrar um serviço com o ID fornecido",
          404
        );
      }

      let editable = false;
      if (userId) {
        const user = await User.findOne(
          { services: { $in: new ObjectId(serviceId) } },
          "_id"
        );
        console.log(user);

        if (user) {
          editable = userId === user._id.toString();
        }
      }

      console.log(userId);
      service = service.toObject({ getters: true });
      res.send({ service: { ...service, editable } });
    } catch (error) {
      if (!error instanceof HttpError) {
        new HttpError("Ocorreu um erro ao consultar o serviço", 500);
      }
      return next(error);
    }
  },

  async updateService(req, res, next) {
    const {
      name,
      street,
      neighborhood,
      category,
      description,
      slogan,
      cnpj,
      image,
    } = req.body;

    const serviceId = req.params.sid;

    let service;
    try {
      service = await Service.findById(serviceId);
    } catch (err) {
      const error = new HttpError(
        "Ocorreu um erro ao atualizar o serviço",
        500
      );
      return next(error);
    }

    service.name = name;
    service.street = street;
    service.neighborhood = neighborhood;
    service.category = category;
    service.description = description;
    service.slogan = slogan;
    service.cnpj = cnpj;
    service.image = image;

    try {
      await service.save();
    } catch (err) {
      const error = new HttpError(
        "Ocorreu um erro ao atualizar o serviço",
        500
      );
      return next(error);
    }
    res.status(200).send({ service: service.toObject({ getters: true }) });
  },

  async delete(req, res, next) {
    try {
      const user = await User.findById(req.userId).select("+password");

      if (!user) {
        const error = new HttpError("Usuário não existe.", 404);
        return next(error);
      }
      
      const serviceId = req.params.serviceId;

      if (!user.services.includes(req.params.serviceId)) {
        const error = new HttpError("Tarefa não cadastrada.", 400);
        return next(error);
      }
      
      user.services.splice(user.services.indexOf(serviceId), 1);
      user.save();

      const service = await Service.findByIdAndDelete(serviceId);

      return res.send({ service });
    } catch (err) {
      const error = new HttpError("Falha ao deletar serviço ou comércio.", 400);
      return next(error);
    }
  },
  async read(req, res, next) {
    const { limit = 0, offset = 0, category } = req.query;

    try {
      let results = await Service.find({ category });

      if (!results) {
        throw new HttpError("Não foi encontrado nenhum serviço", 404);
      }

      if (offset > results.length) {
        throw new HttpError(
          "O valor de offset é maior que os resultados encontrados",
          406
        );
      }

      results = results.slice(offset);

      if (limit > 0) {
        results = results.slice(0, limit);
      }

      return res.status(200).send(results);
    } catch (error) {
      if (!error instanceof HttpError) {
        error = new HttpError(error.message, 500);
      }
      return next(error);
    }
  },
}
