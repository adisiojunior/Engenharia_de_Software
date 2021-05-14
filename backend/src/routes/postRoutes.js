const express = require("express");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const multerConfig = require("../config/multer");
const postController = require("../controllers/postController");


const postRoutes = express.Router();

const celebrateWithJoiOptions = (schema) => {
    const joiOpts = { abortEarly: false }
    return celebrate(schema, joiOpts)
}

// The routes after that will be private routes
postRoutes.use(authMiddleware);

postRoutes.post("/image/:serviceId", multer(multerConfig).single("file"), authMiddleware, postController.create);

postRoutes.get("/images/:serviceId", multer(multerConfig).single("file"), postController.readAll);

postRoutes.get("/image/:serviceId/:postId", multer(multerConfig).single("file"), postController.readOne);

postRoutes.delete('/image/delete/:serviceId/:postId', multer(multerConfig).single("file"), postController.delete);


module.exports = postRoutes;
