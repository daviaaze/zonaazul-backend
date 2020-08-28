module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define('Park', {
    date: DataTypes.DATE,
    location: DataTypes.JSON,
    duration: DataTypes.INTEGER
  })

  Park.associate = models => {
    Park.belongsTo(models.Car)
    Park.belongsTo(models.User)
  }

  return Park
}
