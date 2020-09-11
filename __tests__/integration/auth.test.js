const factory = require('../factories')
const request = require('supertest')
const truncate = require('../utils/truncate')

const app = require('../../src/app')
describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User')
    const response = await request(app)
      .post('/user/authenticate')
      .send({
        email: user.email,
        password: user.password
      })
    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid password', async () => {
    const user = await factory.create('User')
    const response = await request(app)
      .post('/user/authenticate')
      .send({
        email: user.email,
        password: 'bla bla bla'
      })
    expect(response.status).toBe(401)
  })

  it('should not authenticate with invalid email', async () => {
    const user = await factory.create('User')
    const response = await request(app)
      .post('/user/authenticate')
      .send({
        email: 'daviaaze@gmail.com',
        password: user.password
      })
    expect(response.status).toBe(401)
  })
  it('should recieve a JWT token when authenticate', async () => {
    const user = await factory.create('User', {
      password: '123'
    })
    const response = await request(app)
      .post('/user/authenticate')
      .send({
        email: user.email,
        password: '123'
      })
    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123'
    })
    const response = await request(app)
      .get('/user/home')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('should not be able to access private routes without token', async () => {
    const response = await request(app)
      .get('/user/home')

    expect(response.status).toBe(401)
  })

  it('should not be able to access private routes with invalid token', async () => {
    const response = await request(app)
      .get('/user/home')
      .set('Authorization', 'Bearer 123')

    expect(response.status).toBe(401)
  })
})
