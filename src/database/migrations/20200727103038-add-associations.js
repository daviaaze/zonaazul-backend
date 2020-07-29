'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'cars', // name of Source model
      'user_id', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
      .then(() => {
        return queryInterface.addColumn(
          'parks',
          'cars_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'cars',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        )
      })
      .then(() => {
        return queryInterface.addColumn(
          'wallets',
          'user_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        )
      })
      .then(() => {
        return queryInterface.addColumn(
          'buys',
          'wallet_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'wallets',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        )
      })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'cars', // name of Source model
      'user_id' // key we want to remove
    )
      .then(() => {
        return queryInterface.removeColumn(
          'parks', // name of Source model
          'car_id' // key we want to remove
        )
      })
      .then(() => {
        return queryInterface.removeColumn(
          'wallets',
          'user_id'
        )
      })
      .then(() => {
        return queryInterface.removeColumn(
          'buys',
          'wallet_id'
        )
      })
  }
}
