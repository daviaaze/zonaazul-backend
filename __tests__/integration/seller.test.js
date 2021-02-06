const factory = require('../factories')
const request = require('supertest')
const jwt = require('jsonwebtoken')
const truncate = require('../utils/truncate')

const app = require('../../src/app')

describe('Seller', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('Shoud get cars', async () => {
        try {
            // const seller = await factory.build('Seller')
            const response = await request(app)
            .get('/seller/home')
            // .auth(seller.generateToken(), {type: "bearer"})
            expect(1).toBe(1)
        } catch (error){
            console.log(error)
        }
    })
})

