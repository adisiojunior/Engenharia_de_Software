const app = require('../../src/app')
const request = require('supertest')
const faker = require('faker');

const { clearCollections, disconnect } = require('../utils/database');
const { createUserWithDefinedPassword, getAutenticatedToken } = require('../utils/autenticatedUser');
const { serviceFactory } = require('../factories/serviceFactory');

const fakeRatingWithDescription =  {
    stars: faker.datatype.number(max=5),
    description: faker.random.words()
}

afterAll(async () => {
    await clearCollections();
    await disconnect();
})

describe('POST /services/:serviceId/ratings', () => {
    let token, user, service;

    beforeAll(async ()=> {
        await clearCollections();

        user = await createUserWithDefinedPassword('123456')
        token = await getAutenticatedToken(user);

        service = await serviceFactory.create('Service', {})
    })

    it('should create a valid rating with description field', async () => {
        const { status } = await request(app)
            .post(`/services/${service._id}/ratings`)
            .set('Authorization', 'Bearer ' + token) 
            .send(fakeRatingWithDescription);

        expect(status).toBe(200);
    })

    it('should create a valid rating without description field', async () => {
        const { status } = await request(app)
            .post(`/services/${service._id}/ratings`)
            .set('Authorization', 'Bearer ' + token) 
            .send({ stars: fakeRatingWithDescription.stars });

        expect(status).toBe(200);
    })

    it('should not create a rating with empty body', async () => {
        const { status } = await request(app)
            .post(`/services/${service._id}/ratings`)
            .set('Authorization', 'Bearer ' + token)
            .send({});

        expect(status).toBe(400);
    })

    it('should not create a duplicate rating', async () => {
        const { status } = await request(app)
            .post(`/services/${service._id}/ratings`)
            .set('Authorization', 'Bearer ' + token) 
            // The same fakeRatingWithDescription of the first test
            .send(fakeRatingWithDescription);

        expect(status).toBe(409);
    })

    it('should not create a rating with stars highter than five', async () => {
        const { status } = await request(app)
            .post(`/services/${service._id}/ratings`)
            .set('Authorization', 'Bearer ' + token)
            .send({ stars : 10 });

        expect(status).toBe(400);
    })

    it('should not create a rating with stars less than one', async () => {
        const { status } = await request(app)
            .post(`/services/${service._id}/ratings`)
            .set('Authorization', 'Bearer ' + token)
            .send({ stars : 0 });

        expect(status).toBe(400);
    })

    it('should not create a rating with not autenticated user', async () => {
        const { status} = await request(app)
            .delete(`/services/${service._id}/ratings`)
            .send();

        expect(status).toBe(401);
    })

    it('should not create a rating with invalid token', async () => {
        const { status } = await request(app)
            .delete(`/services/${service._id}/ratings`)
            .send();

        expect(status).toBe(401);
    })

    it('should not create a rating with a service that does not exist', async () => {
        const serviceId = (service._id).toString();
        const nextCharOfFirstChat = String.fromCharCode(serviceId.charCodeAt(0) + 1);
        const notExistingServiceId = nextCharOfFirstChat + (serviceId).slice(1);

        expect(notExistingServiceId).not.toStrictEqual(serviceId)

        const { status, body } = await request(app)
            .post(`/services/${notExistingServiceId}/ratings`)
            .set('Authorization', 'Bearer ' + token)
            .send(fakeRatingWithDescription);

        expect(status).toBe(403);
        expect(body).toStrictEqual({ message: "Serviço não cadastrado."});
    })

    it('should not create a rating with invalid service', async () => {
        const { status } = await request(app)
            .post(`/services/${'this service id should not pass'}/ratings`)
            .set('Authorization', 'Bearer ' + token)
            .send(fakeRatingWithDescription);

        expect(status).toBe(400);
    })

    it('should not create a rating with empty service', async () => {
        const { status } = await request(app)
            .post(`/services/${''}/ratings`)
            .set('Authorization', 'Bearer ' + token)
            .send(fakeRatingWithDescription);

        expect(status).toBe(404);
    })
})