const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const jwtVerifyAsync = promisify(jwt.verify, { context: jwt })

const User = require('../models/User');
const HttpError = require('../error/http-error');
require('dotenv/config');

module.exports = async (req, _, next) => {
    const authHeader = req.headers.authorization;

    try {
        if (!authHeader) {
            throw new HttpError('Token não fornecido.', 401);
        }

        req.userId = await validateToken(authHeader);
    
        next();
    } catch (error) {
        if (!error instanceof HttpError) {
            error = new HttpError(error.message, 500);
        }
        next(error)
    }
}

module.exports.validateToken = async (authorizationHeader) => {
    const parts = authorizationHeader.split(' ');
    const [ scheme, token ] = parts;

    try {
        if (!/Bearer$/i.test(scheme)) {
            throw new HttpError('Token mal formado.', 401);
        }

        const decoded = await jwtVerifyAsync(token, process.env.SECRET);

        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            throw new HttpError('Usuário não existe.', 401);
        }

        if (user.token !== token) {
            throw new HttpError('Token vencido.', 401);
        }
        
        return decoded.id;
    } catch (error) {
        if (!(error instanceof HttpError)) {
            error = new HttpError('Token inválido.', 401);
        }
        throw error;
    }
}