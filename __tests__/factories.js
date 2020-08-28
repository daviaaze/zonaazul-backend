const faker = require('faker-br')
const { factory } = require('factory-girl')
const { User, Seller, Car } = require('../src/app/models')

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: faker.br.cpf()
})

factory.define('Seller', Seller, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
factory.define('Car', Car, {
  plate: 'CNT7275',
  model: 'Monza'
})

module.exports = factory
