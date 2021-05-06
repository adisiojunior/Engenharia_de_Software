const User = require("../models/User");
const HttpError = require("../error/http-error");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv/config");

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET, { expiresIn: 86400 });
}

module.exports = {
    async create(req, res) {
        const { email } = req.body;

        try {
            if (await User.findOne({ email })) {
                return res
                    .status(409)
                    .send({ error: `Já existe um usuário com o e-mail: ${email}` });
            }

            const hash = await bcrypt.hash(req.body.password, 10);
            const password = hash;

            const user = await User.create({ ...req.body, password: password });

            user.password = undefined;

            return res.send({
                user,
                token: generateToken({ id: user.id }),
            });
        } catch (err) {
            return res.status(400).send({ error: "Falha no cadastro de usuário." });
        }
    },

    async delete(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.userId });

            if (!user) {
                throw new HttpError("Usuário não existe.", 404)
            }

            await User.deleteOne({ _id: req.userId });

            return res.status(204).send();
        } catch (error) {
            if (!error instanceof HttpError) {
                error = new HttpError(error.message, 400)
            }
            return next(error);
        }
    },

    async login(req, res, next) {
        const { email, password } = req.body;

        //trying to find user with provided email on database
        let user;

        try {
            user = await User.findOne({ email }).select('+password');
        } catch (err) {
            const error = new HttpError(
                "Falha ao realizar login, tente novamente depois",
                500
            );
            return next(error);
        }

        //if there's no such user
        if (!user) {
            const error = new HttpError(
                "Email ou senha inválidos, tente novamente",
                403
            );
            return next(error);
        }

        //verifying provided password using hash
        let validPasswrd = false;
        try {
            validPasswrd = await bcrypt.compare(password, user.password);
        } catch (err) {
            const error = new HttpError(
                "Falha ao realizar login, tente novamente depois 2",
                500
        );
            return next(error);
        }

        if (!validPasswrd) {
            const error = new HttpError(
                "Email ou senha inválidos, tente novamente",
                403
            );
            return next(error);
        }

        //if everything goes right, a token is created and sent back
        let token;
        try {
            token = generateToken({ id: user.id });
            return res.send({
                user,
                token
            });
        } catch (err) {
            //if token couldn't de created
            const error = new HttpError(
                "Falha ao realizar login, tente novamente depois 3",
                500
            );
            return next(error);
        }
    },

    async update(req, res) {
        
        const { email } = req.params;

        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).send({ error: `Usuário com email: ${ email } não encontrado` })
            }

            await User.updateOne({ email });

            return res.status(204).send();
        } catch (err) {
            return res.status(400).send({ error: 'Falha na atualização do usuário.' });
        }
    }
};
