const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const serviceController = require("../controllers/serviceController");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const multerConfig = require("../config/multer");
const Service = require("../models/Service");
const Post = require("../models/Post");

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

serviceRoutes.get("/services/:sid", serviceController.getServiceById);

serviceRoutes.use("/services", authMiddleware);

serviceRoutes.post(
  "/services/register", multer(multerConfig).single("file"),
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
      }),
    },
    joiOpts
  ),
  serviceController.create
);

serviceRoutes.put(
  "/services/update",
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

serviceRoutes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = " " } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  });

  return res.json(post);
});

serviceRoutes.get("/posts", async (req, res) => {
  const posts = await Post.find();

  return res.json(posts);
});


serviceRoutes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  await post.remove();
  return res.send();
});


serviceRoutes.delete("/services/delete/:serviceId", serviceController.delete);

module.exports = serviceRoutes;
