/* eslint-disable */
const request = require('supertest');
const { expect } = require('chai');
const { Product } = require('../models/product.model');
const app = require('../app');

describe('api/products', () => {
    beforeEach(async () => {
        await Product.deleteMany({});
    });

    describe('GET /', () => {
        it('should return all products', async () => {
            const products = [
                { name: 'test', price: 100, description: 'test', image: 'test', category: 'test' },
                { name: 'test1', price: 100, description: 'test1', image: 'test1', category: 'test1' },
            ];

            await Product.insertMany(products);

            const res = await request(app).get('/api/products');
            expect(res.status).to.equal(200);
            expect(res.body).to.equal(2);
        });
    });

    describe('GET/:id', () => {
        it('should return product if valid id is passed', async () => {
            const product = new Product({
                name: 'test', price: 100, description: 'test', image: 'test', category: 'test',
            });
            product.savae();

            const res = await request(app).get(`/api/products/${product._id}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('name', product.name);
        });

        it('should return 400 error if invalid object id is passed', async () => {
            const res = await request(app).get('/api/products/1111');
            expect(res.status).to.equal(404);
        });
    });

    describe('POST /', () => {
        it('should return product when all request body is valid', async () => {
            const res = await request(app)
                .post('/api/products')
                .send({
                    name: 'test',
                    price: 100,
                    description: 'test',
                    image: 'test',
                    category: 'test',
                });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('name', 'test');
        });
    });

    describe('PUT /: id', () => {
        it('should update the existing product and return 200', async () => {
            const product = new Product({
                name: 'test', price: 100, description: 'test', image: 'test', category: 'test',
            });
            await product.save();

            const res = await request(app)
                .put(`/api/products/${product._id}`)
                .send({
                    name: 'test1',
                    price: 100,
                    description: 'test1',
                    image: 'test1',
                    category: 'test1',
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('name', 'test1');
        });
    });

    describe('DELETE /:id', () => {
        it('should delete the existing product and return 200', async () => {
            const product = new Product({
                name: 'test', price: 100, description: 'test', image: 'test', category: 'test',
            });

            await product.save();

            const res = await request(app).delete(`/api/products/${product._id}`);
            expect(res.status).to.equal(200);
        });

        it('should return 404 error if deleted product is requested', async () => {
            const product = new Product({
                name: 'test', price: 100, description: 'test', image: 'test', category: 'test',
            });

            await product.save();
            let res = await request(app).delete(`/api/product/${product._id}`);
            expect(res.status).to.equal(200);

            res = await request(app).get(`/api/products/${product._id}`);
            expect(res.status).to.equal(404);
        });
    });
});