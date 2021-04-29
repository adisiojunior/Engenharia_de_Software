// A test case file with all tests of User Routes
// Using black-box to test all the endpoints of User Routes

const app = require('../../src/app')
const request = require('supertest')

const factory = require('../factories');

const { truncate, disconnect } = require('../utils/database');

describe('DELETE', () => {
    beforeEach(async ()=> {
        await truncate();
    })

    afterAll(async () => {
        await disconnect();
        await app.close();
    })

    it('should be able to delete a valid user', async () => {
        const user = await factory.create("User");

        const response = await request(app)
            .delete(`/users/${user.email}`)
            .send();

        expect(response.status).toBe(204);
    })
   
    it('should delete a email not registered', async () => {
        await factory.create("User", {
            email: 'email@gmail.com'
        });

        const notRegisteredEmail = 'email1@gmail.com'

        const response = await request(app)
            .delete(`/users/${notRegisteredEmail}`)
            .send();

        expect(response.status).toBe(404);
    })

    it('should not be able to delete a invalid email', async () => {
        const invalidEmail = 'email1????????'

        const response = await request(app)
            .delete(`/users/${invalidEmail}`)
            .send();

        expect(response.status).toBe(400);
    })

    it.todo('should not be able to delete user without autentication')
});