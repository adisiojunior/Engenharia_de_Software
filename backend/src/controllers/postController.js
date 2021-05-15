const Post = require("../models/Post");
const Service = require("../models/Service");
const User = require("../models/User");
const HttpError = require("../error/http-error");
const { read } = require("./serviceController");

module.exports = {
  async create(req, res) {
    try {
      const serviceId = req.params.serviceId;
      const userId = req.userId;
      const service = await Service.findById(serviceId);
      const { originalname: name, size, key, location: url = " " } = req.file;

      if (!(await User.findById(userId))) {
        throw new HttpError("Usuário não cadastrado.", 403);
      }

      if (!service) {
        throw new HttpError("Serviço não cadastrado.", 403);
      }

      const post = await Post.create({
        ...req.body,
        userId: userId,
        serviceId: serviceId,
        name,
        size,
        key,
        url,
      });
      
      await Service.findByIdAndUpdate(serviceId, { image: url }, { new: true });

      return res.status(200).send({ post });
    } catch (error) {
      return res.status(400).send({ error: "Some error ocurred" });
    }
  },

  async delete(req, res, next) {
    try {
      const service = await Service.findById(req.params.serviceId);

      if (!(await User.findById(req.userId))) {
        const error = new HttpError("Usuário não cadastrado.", 403);
        return next(error);
      }

      if (!service) {
        const error = new HttpError("Serviço não cadastrado.", 403);
        return next(error);
      }

      if (!await Post.findOne({ serviceId: service._id })) {
        const error = new HttpError("Imagem não cadastrada.", 403);
        return next(error);
      }

      await Service.findByIdAndUpdate(service._id, { image: "" }, { new: true });

      const post = await Post.findOneAndDelete({ serviceId: service._id });
      return res.send({ post });
    } catch (err) {
      const error = new HttpError(
        "Falha ao deletar imagem, tente novamente.",
        400
      );
      return next(error);
    }
  },

  async readAll(req, res, next) {
    try {
      const serviceId = req.params.serviceId;

      if (!(await Service.findById(serviceId))) {
        throw new HttpError("Serviço não cadastrado.", 403);
      }

      const images = await Post.find({ serviceId });

      if (!images) {
        throw new HttpError("Nenhuma imagem encontrada.", 409);
      }

      return res.status(200).send(images);
    } catch (error) {
      if (!error instanceof HttpError) {
        error = new HttpError(error.message, 400);
      }
      return next(error);
    }
  },

  async readOne(req, res, next) {
    try {
      const serviceId = req.params.serviceId;
      const service = await Service.findById(serviceId);

      if (!await User.findById(req.userId)) {
        throw new HttpError('Usuário não cadastrado.', 409);
      }

      if (!service) {
        throw new HttpError("Serviço não cadastrado.", 403);
      }

      if (!await Post.findOne({ serviceId: serviceId })) {
        throw new HttpError('Imagem não pertence ao serviço.', 400);
      }

      return res.send({ url: service.image });
    } catch (error) {
      if (!error instanceof HttpError) {
        error = new HttpError(error.message, 400);
      }
      return next(error);
    }
  },
};
