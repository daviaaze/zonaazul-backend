const faker = require('faker-br')
const request = require('supertest')
const truncate = require('../utils/truncate')
const app = require('../../src/app')

describe('Register', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'Abcdefg8',
        cpf: faker.br.cpf()
      })
    expect(response.status).toBe(200)
  })
  it('should return a token when registered', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'Abcdefg8',
        cpf: faker.br.cpf()
      })
    expect(response.body).toHaveProperty('token')
  })
  it('should not register with invalid email', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: faker.name.findName(),
        email: '123',
        password: 'Abcdefg8',
        cpf: faker.br.cpf()
      })
    expect(response.status).toBe(401)
  })
  it('should not register with invalid cpf', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'Abcdefg8',
        cpf: '123'
      })
    expect(response.status).toBe(401)
  })
  it('should not register with invalid password', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123',
        cpf: faker.br.cpf()
      })
    expect(response.status).toBe(401)
  })
})
