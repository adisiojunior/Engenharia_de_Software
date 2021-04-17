const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv/config');

function generateToken(params = {}) {
    return jwt.sign(params, process.env.SECRET, { expiresIn: 86400 });
}

module.exports = {
    async create(req, res) {
        const { email } = req.body;

        try {
            if (await User.findOne({ email })) {
                return res.status(409).send({ error: `Já existe um usuário com o e-mail: ${email}` });
            }

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({
                user,
                token: generateToken({ id: user.id })
            });
        }
        catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'Falha no cadastro de usuário.' });
        }
    }
}