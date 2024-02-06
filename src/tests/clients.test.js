const client = require('../configs/client');
const supertest = require('../configs/supertest')

describe('POST /clients', () => {
    test('Without email', async () => {
        const { statusCode } = await supertest.post('/clients')
        .send({
            name: 'User Test',
            phone: '(99) 91234-1234'
        })

        expect(statusCode).toBe(400)
    });

    test('Without name', async () => {
        const { statusCode } = await supertest.post('/clients')
        .send({
            email: 'email@domain.com',
            phone: '(99) 91234-1234'
        })

        expect(statusCode).toBe(400)
    });

    test('Without phone', async () => {
        const { statusCode } = await supertest.post('/clients')
        .send({
            email: 'email@domain.com',
            name: 'User Test'
        })

        expect(statusCode).toBe(400)
    });

    test('Create user with name Test', async () => {
        const { statusCode } = await supertest.post('/clients')
        .send({
            email: 'email@domain.com',
            name: 'User Test',
            phone: '(99) 98877-6655'
        })

        expect(statusCode).toBe(201)
    });

    afterAll(async () => {
        await client.query("DELETE FROM clients WHERE name = 'User Test'")

        await client.end()
    })
})