module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    value: DataTypes.INTEGER
  })

  Wallet.associate = models => {
    Wallet.belongsTo(models.User)
    Wallet.hasMany(models.Buy)
  }

  return Wallet
}
