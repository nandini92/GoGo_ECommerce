const supertest = require('supertest');

const { createServer } = require('../utils');

const app = createServer();

describe('items' , () => {
    describe('get items route', () => {
        it('should return a non-empty array', async () => {
            const { status, body } = await supertest(app).get('/items');
            const items = body.data;

            expect(status).toBe(200);
            expect(items.length).toBeGreaterThan(0);
        })
    })

    describe('get item route', () => {
        it('should return 404 if id is not found' ,async () => {
            const itemId = 'product-123';

            const {status} = await supertest(app).get(`/item/${itemId}`);

            expect(status).toBe(404);
        })
    })
})