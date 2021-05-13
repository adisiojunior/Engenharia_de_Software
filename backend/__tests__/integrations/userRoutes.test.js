// A test case file with all tests of User Routes

const app = require('../../src/app')
const request = require('supertest')

const { clearCollections, disconnect } = require('../utils/database');
const { createUserWithDefinedPassword, getAutenticatedToken } = require('../utils/autenticatedUser');

afterAll(async () => {
    await clearCollections();
    await disconnect();
})

describe('DELETE /users/auth/delete', () => {
    let token, user;

    beforeAll(async ()=> {
        await clearCollections();

        user = await createUserWithDefinedPassword('123456')
        token = await getAutenticatedToken(user);
    })

    it('should be able to delete a valid user', async () => {
        const { status, body } = await request(app)
            .delete(`/users/auth/delete`)
            .set('Authorization', 'Bearer ' + token) 
            .send();

        expect(status).toBe(204);
        expect(body).toStrictEqual({});
    })

    it('should not be able to delete a previous deleted user', async () => {
        const { status, body } = await request(app)
            .delete(`/users/auth/delete`)
            .set('Authorization', 'Bearer ' + token) 
            .send();

        expect(status).toBe(401);
        expect(body).toStrictEqual({ message: "Usuário não existe." });
    })

    it('should not be able to delete user without autentication', async () => {
        const { status, body } = await request(app)
            .delete(`/users/auth/delete`)
            .send();

        expect(status).toBe(401);
        expect(body).toStrictEqual({ message: "Token não fornecido." })
    });   
});

describe('UPDATE /users/auth/update', () => {
    let token, user;

    beforeAll(async ()=> {
        await clearCollections();

        user = await createUserWithDefinedPassword('123456')
        token = await getAutenticatedToken(user);
    })

    it('should be able to update a valid user', async ()=> {
        const { status } = await request(app)
            .put(`/users/auth/update`)
            .set('Authorization', 'Bearer ' + token)
            .send();
        
        expect(status).toBe(200);
    })

    it('should not be able to update a invalid user', async ()=> {
        await request(app)
            .delete(`/users/auth/delete`)
            .set('Authorization', 'Bearer ' + token) 
            .send();

        const { status, body } = await request(app)
            .put(`/users/auth/update`)
            .set('Authorization', 'Bearer ' + token)
            .send();
        
        expect(status).toBe(401);
        expect(body).toStrictEqual({message: "Usuário não existe."});
    })

    it('should not be able to update user without autentication', async () => {
        const { status, body } = await request(app)
            .put(`/users/auth/update`)
            .send();

        expect(status).toBe(401);
        expect(body).toStrictEqual({ message: "Token não fornecido." })
    })
});

describe('LOGIN /login', () => {
    let user;
    const password = '123456';

    beforeAll(async ()=> {
        await clearCollections();

        user = await createUserWithDefinedPassword('123456');
        token = await getAutenticatedToken(user);
    })

    it('should be able to log a user with valid credentials in', async ()=> {
        const { status } = await request(app)
            .post(`/login`)
            .send({ email: user.email, password });
        
        expect(status).toBe(200);
    })

    it('should not be able to log a user with invalid credentials in', async ()=> {
        const { status, body } = await request(app)
            .post(`/login`)
            .send({ email: user.email, password: 'password' });
        
        expect(status).toBe(403);
        expect(body).toStrictEqual({message: "Email ou senha inválidos, tente novamente"})
    })
});