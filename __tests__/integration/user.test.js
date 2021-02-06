const factory = require('../factories')
const request = require('supertest')
const truncate = require('../utils/truncate')

const app = require('../../src/app')
describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })
  it('Should find a user', async () => {
      const user = await factory.create('User')
      const response = await request(app)
      .get('/user/info')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      expect(response.body.user.name).toBe(user.name)
  })
})