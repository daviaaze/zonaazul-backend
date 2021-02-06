const faker = require('faker-br')
const { factory } = require('factory-girl')
const { User, Seller, Car, Park } = require('../src/app/models')

factory.define('User', User, {
  id: faker.random.number(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: faker.br.cpf()
})

factory.define('Seller', Seller, {
  id: faker.random.number(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

factory.define('Car', Car, {
  plate: 'CNT7275',
  model: 'Monza',
  user: factory.assoc('User')
})

factory.define('Park', Park, {
  date: faker.date.recent(),
  location: {
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude()
  },
  duration: faker.random.number(1, 2),
  user: factory.assoc('User'),
  car: factory.assoc('Car')
})

module.exports = factory
