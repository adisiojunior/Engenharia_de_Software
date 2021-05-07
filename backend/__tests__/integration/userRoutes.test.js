// A test case file with all tests of User Routes

const app = require('../../src/app')
const request = require('supertest')
const bcrypt = require('bcryptjs')

const factory = require('../factories/userFactory');

const { clearCollections, disconnect } = require('../utils/database');

afterAll(async () => {
    await disconnect();
})

describe('DELETE /users', () => {
    let token, user;

    beforeAll(async ()=> {
        await clearCollections();

        user = await createUserWithDefinedPassword('123456')
        token = await getAutenticatedToken(user);
    })

    it('should be able to delete a valid user', async () => {
        const { status, body } = await request(app)
            .delete(`/users`)
            .set('Authorization', 'Bearer ' + token) 
            .send();

        expect(status).toBe(204);
        expect(body).toStrictEqual({});
    })

    it('should not be able to delete a previous deleted user', async () => {
        const { status, body } = await request(app)
            .delete(`/users`)
            .set('Authorization', 'Bearer ' + token) 
            .send();

        expect(status).toBe(400);
        expect(body).toStrictEqual({ error: "Usuário não existe." });
    })

    it('should not be able to delete user without autentication', async () => {
        const { status, body } = await request(app)
            .delete(`/users`)
            .send();

        expect(status).toBe(401);
        expect(body).toStrictEqual({ error: "Token não fornecido." })
    });
});

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