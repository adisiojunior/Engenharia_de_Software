const { factory } = require('factory-girl');
const faker = require('faker');
const User = require('../../src/models/User');

// Will generate random values for the atributtes of an User
factory.define('User', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
});

module.exports = factory;