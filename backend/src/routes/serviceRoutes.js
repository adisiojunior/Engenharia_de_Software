const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const serviceController = require("../controllers/serviceController");
const authMiddleware = require("../middleware/auth");

const serviceRoutes = express.Router();

// When an error occurs, all erros are returned
const joiOpts = { abortEarly: false };

serviceRoutes.get(
  "/services",
  celebrate(
    {
      [Segments.QUERY]: Joi.object().keys({
        category: Joi.array(),
        limit: Joi.number().min(1).max(15),
        offset: Joi.number().min(0).max(14),
      }),
    },
    joiOpts
  ),
  serviceController.read
);

serviceRoutes.get("/services/search", serviceController.search);

serviceRoutes.get("/services/:sid", serviceController.getServiceById);

serviceRoutes.use("/services", authMiddleware);

serviceRoutes.post(
  "/services/register",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        category: Joi.array().required(),
        street: Joi.string().required(),
        neighborhood: Joi.string().required(),
        description: Joi.string().required(),
        slogan: Joi.string(),
        cnpj: Joi.string(),
        image: Joi.array(),
        instagram: Joi.string(),
        whatsapp: Joi.string(),
        email: Joi.string().email(),
      }),
    },
    joiOpts
  ),
  serviceController.create
);

serviceRoutes.put(
  "/services/update/:sid",
  celebrate(
    {
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
      }),
    },
    joiOpts
  ),
  serviceController.updateService
);

serviceRoutes.delete("/services/delete/:serviceId", serviceController.delete);

serviceRoutes.get(
  "/getServicesByUser",
  authMiddleware,
  serviceController.getServicesByUser
);

module.exports = serviceRoutes;
