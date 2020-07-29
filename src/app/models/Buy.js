module.exports = (sequelize, DataTypes) => {
  const Buy = sequelize.define('Buy', {
    value: DataTypes.INTEGER,
    date: DataTypes.DATE
  })

  Buy.associate = models => {
    Buy.belongsTo(models.Wallet)
  }

  return Buy
}
