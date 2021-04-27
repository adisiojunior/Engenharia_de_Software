const { factory } = require('factory-girl')
const faker = require('faker')
const User = require('../src/models/User')

factory.define('User', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
});

module.exports = factory;

