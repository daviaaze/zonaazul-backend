const faker = require('faker-br')
const factory = require('../factories')
const request = require('supertest')
const truncate = require('../utils/truncate')
const app = require('../../src/app')

describe('Register', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        cpf: faker.br.cpf()
      })
    expect(response.status).toBe(200)
  })
  it('should return a token when registered', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        cpf: faker.br.cpf()
      })
    expect(response.body).toHaveProperty('token')
  })
  it('should not register with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        name: faker.name.findName(),
        email: '123',
        password: '123',
        cpf: '123'
      })
    expect(response.status).toBe(401)
  })
})
