const supertest = require("supertest");

const { createServer } = require("../utils");

const app = createServer();

describe('companies', () => {
    describe('get companies route', () => {
        it('should successfully return a non-empty array', async () => {
            const { status, body } = await supertest(app).get('/companies');
            const companies = body.data;

            expect(status).toBe(200);
            expect(companies.length).toBeGreaterThan(0);
        })
    })

    describe('get company route', () => {
        it('should return 404 if no companies returned', async () => {
            const companyId = 'company-123';

            const { status } = await supertest(app).get(`/company/${companyId}`);

            expect(status).toBe(404);
        })
    })
})

