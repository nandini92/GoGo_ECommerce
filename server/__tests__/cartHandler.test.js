const supertest = require('supertest');

const { createServer } = require('../utils');

const app = createServer();

describe.only('cart', () => {
    let cartId;

    describe('cart update', () => {

        beforeAll( async () => {
            const { body } = await supertest(app).get('/cart');
            cartId = body.data.insertedId;
        })

        afterAll( async () => {
            await supertest(app).delete(`/cart/${cartId}`);
        })

        it('should add item to empty cart', async () => {
            const payload = {quantity: 1, product: 6551};

            const { status, body } = await supertest(app)
            .patch(`/cart/${cartId}`)
            .send(payload);
            const results = body.data; 

            expect(status).toBe(200);
            expect(results).toMatchObject(payload);
        })

        it('should update existing item in existing cart', async () => {
            const payload = {quantity: 2, product: 6551};

            const { status, body } = await supertest(app)
            .patch(`/cart/${cartId}`)
            .send(payload);
            const results = body.data; 

            expect(status).toBe(200);
            expect(results).toMatchObject(payload);
        })

        it('should remove item from existing cart', async () => {
            const payload = {product: 6551};

            const { status, body } = await supertest(app)
            .patch(`/remove-product-cart/${cartId}`)
            .send(payload);
            const results = body.data; 

            expect(status).toBe(200);
            expect(results).toMatchObject(payload);
        })
    })

    describe('delete cart', () => {

        it('should delete an existing cart', async () => {
            // using shared cartId from previous tests 

            await supertest(app)
            .get(`/cart/${cartId}`)
            .expect(404);
        })
    })
})