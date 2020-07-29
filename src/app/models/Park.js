module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define('Park', {
    email: DataTypes.STRING,
    datetime: DataTypes.DATE,
    location: DataTypes.JSON,
    duration: DataTypes.INTEGER
  })

  Park.associate = models => {
    Park.belongsTo(models.Car)
  }

  return Park
}
