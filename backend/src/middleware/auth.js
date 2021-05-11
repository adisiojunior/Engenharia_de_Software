const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv/config');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'Token não fornecido.' });
    }

    const parts = authHeader.split(' ');

    const [ scheme, token ] = parts;

    if (!/Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token mal formado.' });
    }

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token inválido.' });
        }

        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            return res.status(400).send({ error: 'Usuário não existe.' });
        }

        if (user.token !== token) {
            return res.status(401).send({ error: 'Token vencido.' });
        }

        req.userId = decoded.id;
        next();
    });
}