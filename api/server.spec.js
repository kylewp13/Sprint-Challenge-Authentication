const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');

const newUser = {
    username: "Test12",
    password: "Test12"
}

describe('server.js', () => {

    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('/api/jokes', () => {
        // endpoint for .get() /api/jokes
        it('should return an 200 status code .GET from /api/jokes', async () => {
            await request(server).post('/api/auth/register').send(newUser)
            await request(server).post('/api/auth/login').send(newUser).then( async (user) => {
                const response = await request(server).get('/api/jokes').set({ auth: user.body.token });
                expect(response.status).toEqual(200);
            })
        });

        it('should return a JSON object .GET from /api/jokes', async () => {
            await request(server).post('/api/auth/register').send(newUser)
            await request(server).post('/api/auth/login').send(newUser).then( async (user) => {
                const response = await request(server).get('/api/jokes').set({ auth: user.body.token });
                expect(response.type).toEqual('application/json');
            })
        });

        // endpoint for .post /api/auth/register
        it('should return an 500 status code .POST from /register with no payload for register', async () => {
            const response = await request(server).post('/api/auth/register');
            expect(response.status).toEqual(500);
        });
    
        it('should return a JSON object .POST from /register', async () => {
            const response = await request(server).post('/api/auth/register').send(newUser)
            expect(response.status).toBe(201);
            expect(response.type).toEqual('application/json');
        });

        // endpoint for .post /api/auth/login
        it('should return an 401 status code .POST from /login with no payload for login', async () => {
            const login = await request(server).post('/api/auth/login').send(newUser)
            expect(login.type).toEqual('application/json');
        });
    
        it('should return a JSON object .POST from /register', async () => {
            await request(server).post('/api/auth/register').send(newUser);
            const login = await request(server).post('/api/auth/login').send(newUser)
            expect(login.status).toBe(200);
        });
    });
});