const factory = require('../factories')
const request = require('supertest')
const truncate = require('../utils/truncate')

const app = require('../../src/app')
describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should authenticate with valid credentials', async () => {
    const seller = await factory.create('Seller')
    const response = await request(app)
      .post('/seller/auth')
      .send({
        email: seller.email,
        password: seller.password
      })
    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid password', async () => {
    const seller = await factory.create('Seller')
    const response = await request(app)
      .post('/seller/auth')
      .send({
        email: seller.email,
        password: 'bla bla bla'
      })
    expect(response.status).toBe(402)
  })

  it('should not authenticate with invalid email', async () => {
    const seller = await factory.create('Seller')
    const response = await request(app)
      .post('/seller/auth')
      .send({
        email: 'daviaaze@gmail.com',
        password: seller.password
      })
    expect(response.status).toBe(402)
  })
  it('should recieve a JWT token when authenticate', async () => {
    const seller = await factory.create('Seller', {
      password: '123'
    })
    const response = await request(app)
      .post('/seller/auth')
      .send({
        email: seller.email,
        password: '123'
      })
    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when authenticated', async () => {
    const seller = await factory.create('Seller', {
      password: '123'
    })
    const response = await request(app)
      .get('/seller/getParks')
      .set('Authorization', `Bearer ${seller.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('should not be able to access private routes without token', async () => {
    const response = await request(app)
      .get('/seller/getParks')

    expect(response.status).toBe(401)
  })

  it('should not be able to access private routes with invalid token', async () => {
    const response = await request(app)
      .get('/seller/getParks')
      .set('Authorization', 'Bearer 123')

    expect(response.status).toBe(401)
  })
})
