const express = require("express");
const userController = require("../controllers/userController");
const { celebrate, Segments, Joi } = require("celebrate");

const userRoutes = express.Router();

// When a error occurs, all erros are returned
const joiOpts = { abortEarly: false };

userRoutes.post(
  "/register",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
          .required(),
        birthDay: Joi.date().required(),
      }),
    },
    joiOpts
  ),
  userController.create
);

userRoutes.delete(
  "/users/:email",
  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys({
        email: Joi.string().required().email(),
      }),
    },
    joiOpts
  ),
  userController.delete
);

userRoutes.post(
  "/login",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
          .required(),
      }),
    },
    joiOpts
  ),
  userController.login
);

userRoutes.put('/users/:email', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required().email()
  })
}, joiOpts), userController.update);

module.exports = userRoutes;