const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING
  },
  {
    hooks: {
      beforeSave: async seller => {
        if (seller.password) {
          seller.password_hash = await bcrypt.hash(seller.password, 8)
        }
      }
    }
  })

  Seller.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  Seller.prototype.generateToken = function () {
    return jwt.sign({ seller_id: this.id }, process.env.APP_SECRET)
  }

  Seller.associate = models => {
    Seller.hasMany(models.Buy)
  }

  return Seller
}
