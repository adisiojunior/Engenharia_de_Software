const app = require('../../src/app')
const request = require('supertest')
const bcrypt = require('bcryptjs')
const factory = require('../factories/userFactory');

const getAutenticatedToken = async ({ email, password }) => {
    const { body } = await request(app)
        .post('/login')
        .send({ email, password });

    return body.token;
}

const createUserWithDefinedPassword = async ( password ) => {
    const hash = await bcrypt.hash(password, 10);

    const storedUser = await factory.create("User", {
        password: hash
    });

    return { email: storedUser.email, password }
}

module.exports = {
    getAutenticatedToken,
    createUserWithDefinedPassword
}