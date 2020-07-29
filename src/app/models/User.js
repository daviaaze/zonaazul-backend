const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        // isEmail: true
      }

    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        // len: [4, 10]
      }
    },
    password_hash: DataTypes.STRING,
    cpf: {
      type: DataTypes.STRING,
      validate: {
        // is: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
      }
    }
  },
  {
    hooks: {
      beforeSave: async user => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8)
        }
      }
    }
  })

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET)
  }

  User.associate = models => {
    User.hasOne(models.Wallet)
    User.hasMany(models.Car)
  }

  return User
}
