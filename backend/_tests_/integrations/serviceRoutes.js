const app = require('../../src/app')
const request = require('supertest')

const { clearCollections, disconnect } = require('../utils/database');
const { createUserWithDefinedPassword, getAutenticatedToken } = require('../utils/autenticatedUser');

const { serviceFactory } = require('../factories/serviceFactory');

afterAll(async () => {
    await clearCollections();
    await disconnect();
})

describe('GET /services', () => {
    let createdServices;

    beforeAll(async ()=> {
        await clearCollections();

        createdServices = await populateWithThreeServices();
    })

    it('should return all created services from authenticated user', async () => {
        const user = await createUserWithDefinedPassword('123456')
        const token = await getAutenticatedToken(user);

        const { status, body } = await request(app)
            .get('/services')
            .set('Authorization', 'Bearer ' + token)
            .send();
        
        expect(status).toBe(200);
        verifyEqualityOfTwoArrays(body, createdServices)        
    })

    it('should return all created services from a not authenticated user', async ()=> {
        const { status, body } = await request(app)
            .get('/services')
            .send();
        
        expect(status).toBe(200);
        verifyEqualityOfTwoArrays(body, createdServices)
    })

    it('should return only services with the defined categories', async () => {
        const servicesDefinedCategories = [createdServices[0], createdServices[1]]
        const definedCategories = createdServices[0].category;

        const query = createQueryOfCategoriesArray(definedCategories)
        
        const { status, body } = await request(app)
            .get(`/services/${query}`)
            .send();
        
        expect(status).toBe(200);
        verifyEqualityOfTwoArrays(body, servicesDefinedCategories)
    })

    it('should return a error, because category defined not exist', async () => {
        const definedCategories = ["imobiliária"];

        const query = createQueryOfCategoriesArray(definedCategories)
        
        const { status, body } = await request(app)
            .get(`/services/${query}`)
            .send();
        
        expect(status).toBe(404);
        expect(body).toStrictEqual({message: "Não foi encontrado nenhum serviço"})
    })
    
    it('should return a specified limit of results', async () => {
        const limit = 2;

        const query = `?limit=${limit}`
        const { status, body } = await request(app)
            .get(`/services${query}`)
            .send();
        
        expect(status).toBe(200);
        expect(body.length).toBe(limit)
    })

    it('should return a error when specified limit of results smaller than one', async () => {
        const limit = 0;

        const query = `?limit=${limit}`
        const { status } = await request(app)
            .get(`/services${query}`)
            .send();
        
        expect(status).toBe(400);
    })

    it('should return a error when specified limit of results bigger than to fifteen', async () => {
        const limit = 16;

        const query = `?limit=${limit}`
        const { status } = await request(app)
            .get(`/services${query}`)
            .send();
        
        expect(status).toBe(400);
    })

    it('should return the results from a specified offset', async () => {
        const servicesFromSecondResult = createdServices.slice(2);

        const offset = 2;
        const query = `?offset=${offset}`
        const { status, body } = await request(app)
            .get(`/services${query}`)
            .send();
        
        expect(status).toBe(200);
        verifyEqualityOfTwoArrays(body, servicesFromSecondResult);
    })

    it('should return an error when a specified offset bigger than total results', async () => {
        const offset = 10;
        
        const query = `?offset=${offset}`
        const { status } = await request(app)
            .get(`/services${query}`)
            .send();
        
        expect(status).toBe(406);
    })

    it('should return an error when a specified offset smaller than zero', async () => {
        const offset = -1;
        
        const query = `?offset=${offset}`
        const { status } = await request(app)
            .get(`/services${query}`)
            .send();
        
        expect(status).toBe(400);
    })

    it('should return an error when a specified offset bigger than forteen', async () => {
        const offset = 15;
        
        const query = `?offset=${offset}`
        const { status } = await request(app)
            .get(`/services${query}`)
            .send();
        
        expect(status).toBe(400);
    })   
})

describe('POST /services/register', () => {

    beforeAll(async ()=> {
        await clearCollections();

        createdServices = await populateWithThreeServices();
    })

    it('should be able to create a valid service', async () => {
        const user = await createUserWithDefinedPassword('123456');
        const token = await getAutenticatedToken(user);

        const { status, body } = await request(app)
            .post('/services/register')
            .set('Authorization', 'Bearer ' + token)
            .send();
        
        expect(status).toBe(200);
    })

    it('should not be able to create a valid service without autentication', async () => {
        const user = await createUserWithDefinedPassword('123456');
        const token = await getAutenticatedToken(user);

        const { status, body } = await request(app)
            .post('/services/register')
            .set('Authorization', 'Bearer ' + token)
            .send();

            expect(status).toBe(401);
            expect(body).toStrictEqual({ error: "Token não fornecido." })
    })

    it('should not be able to create a previous created service', async () => {
        const user = await createUserWithDefinedPassword('123456');
        const token = await getAutenticatedToken(user);

        const { status, body } = await request(app)
            .post('/services/register')
            .set('Authorization', 'Bearer ' + token)
            .send();

            expect(status).toBe(409);
    })
});

const populateWithThreeServices = async () => {
    let service1 = await serviceFactory.create('Service', {
        category: ["bebidas", "comidas"]
    })

    let service2 = await serviceFactory.create('Service', {
        category: ["bebidas", "comidas"]
    })

    let service3 = await serviceFactory.create('Service', {
        category: ["eletronicos"]
    })

    return [service1, service2, service3]
}

const createQueryOfCategoriesArray = (array) => {
    return array.reduce(((accum, category) => accum + `category[]=${category}&`), '?');
}

const verifyEqualityOfTwoArrays = (array1, array2) => {
    expect(array1.length).toBe(array2.length)

    for (let index = 0; index < array1; index++) {
        expect(array1[index]).toEqual(array2[index])
    }
}