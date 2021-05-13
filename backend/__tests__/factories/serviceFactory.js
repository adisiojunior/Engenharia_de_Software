const { factory } = require('factory-girl')
const faker = require('faker')
const Service = require('../../src/models/Service')

// Will generate random values for the atributtes of an Service
const fakeService = {
        name: faker.company.companyName(),
        street: faker.address.streetName(),
        neighborhood: faker.address.streetName(),
        category: faker.datatype.array(),
        description: faker.random.words(),
        slogan: faker.company.companySuffix(),
        cnpj: faker.random.alphaNumeric(),
        image: faker.image.business(),
        whatsapp: faker.phone.phoneNumber(),
        instagram: faker.internet.url(),
        email: faker.internet.email()
}

factory.define('Service', Service, { fakeService });

module.exports = { serviceFactory : factory, fakeService };