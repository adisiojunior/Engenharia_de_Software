const {
  Types: { ObjectId },
} = require("mongoose");
const multer = require("multer");
const { query } = require("express");
const { off } = require("superagent");
const HttpError = require("../error/http-error");
const Service = require("../models/Service");
const User = require("../models/User");
require("dotenv/config");

const { validateToken } = require("../middleware/auth");

require("dotenv/config");

module.exports = {
  async create(req, res) {
    try {
      const user = await User.findById(req.userId).select("+password");

      if (
        await Service.findOne({ name: req.body.name, street: req.body.street })
      ) {
        return res.status(409).send({ error: `Serviço já existente` });
      }

      const service = await Service.create(req.body);

      user.services.push(service._id);
      user.save();
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

    try {
      let service = await Service.findById(serviceId);

      if (!service) {
        throw new HttpError(
          "Não foi possível encontrar um serviço com o ID fornecido",
          404
        );
      }

      const authorizationHeader = req.headers.authorization;
      const editable = await serviceIsEditable(authorizationHeader, serviceId);

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

    try {
      const service = await Service.findById(serviceId);

      if (!service) {
        throw new HttpError("Ocorreu um erro ao atualizar o serviço", 500);
      }

      service.name = name;
      service.street = street;
      service.neighborhood = neighborhood;
      service.category = category;
      service.description = description;
      service.slogan = slogan;
      service.cnpj = cnpj;
      service.image = image;

      await service.save();

      res.status(200).send({ service: service.toObject({ getters: true }) });
    } catch (error) {
      if (!error instanceof HttpError) {
        throw new HttpError("Ocorreu um erro ao atualizar o serviço", 500);
      }
      next(error);
    }
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

    const query = category ? { category: { $in: category } } : {};

    try {
      let results = await Service.find(query);

      if (results.length === 0) {
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

      results.sort((a, b) => {
        if (a.ratingMean > b.ratingMean) {
          return -1;
        }
        if (a.ratingMean < b.ratingMean) {
          return 1;
        }
        return 0;
      });

      return res.status(200).send(results);
    } catch (error) {
      if (!error instanceof HttpError) {
        error = new HttpError(error.message, 500);
      }
      return next(error);
    }
  },

  async search(req, res, next) {
    let { limit = 0, offset = 0, name, category } = req.query;
    try {
      limit = parseInt(limit);
      offset = parseInt(offset);
    } catch (err) {
      const error = new HttpError(
        "Falha ao obter os valores para limit e offset",
        400
      );
      return next(error);
    }

    let regex = new RegExp(name, "i");
    const query = {
      $and: [{ name: { $regex: regex } }, { category: { $in: category } }],
    };

    let results;
    let total;
    try {
      total = await Service.countDocuments(query);
    } catch (err) {
      const error = new HttpError("Falha ao conectar-se ao servidor", 500);
      return next(error);
    }

    if (offset > total) {
      const error = new HttpError(
        "O valor de offset é maior que os resultados encontrados",
        406
      );
      return next(error);
    }

    results = await Service.find(query).skip(offset).limit(limit);

    if (results.length === 0) {
      const error = new HttpError(
        "Não foi encontrado nenhum serviço com as especificações fornecidas",
        404
      );
      return next(error);
    }

    const pages = limit ? Math.ceil(total / limit) : 1;

    return res.status(200).send({ results, pages });
  },

  async getServicesByUser(req, res, next) {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        throw new HttpError('Usuário não cadastrado.', 409);
      }

      let result = [];

      for (let serviceId of user.services) {
        let service = await Service.findById(serviceId);
        result.push(service);
      }

      return res.send({ result });
    }
    catch (error) {
      if (!error instanceof HttpError) {
        error = new HttpError(error.message, 400);
      }
      return next(error);
    }
  }
};

const serviceIsEditable = async (authorizationHeader, serviceId) => {
  let editable = false;
  if (authorizationHeader) {
    const userId = await validateToken(authorizationHeader);

    const user = await User.findOne(
      { services: { $in: new ObjectId(serviceId) } },
      "_id"
    );

    if (user) {
      editable = userId === user._id.toString();
    }
  }
  return editable;
};
