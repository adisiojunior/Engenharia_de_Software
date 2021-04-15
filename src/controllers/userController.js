const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv/config');

function generateToken(params = {}) {
    return jwt.sign(params, process.env.SECRET, { expiresIn: 86400 });
}

module.exports = {
    async test(req, res) {
        return res.send({ ok: true });
    }
}