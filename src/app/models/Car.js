module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    plate: DataTypes.STRING,
    model: DataTypes.STRING
  })

  Car.associate = models => {
    Car.belongsTo(models.User)
    Car.hasMany(models.Park)
  }

  return Car
}
