const { Park, User } = require('../models')
class ParkController {
  async register (req, res) {
    const { carId, location, duration } = req.body
    const { userId } = req

    const user = await User.findByPk(userId)

    if (user.wallet < duration) return res.status(401).json({ message: 'Saldo Insuficiente' })

    user.setDataValue('wallet', user.wallet - duration)

    await user.save()

    const park = await Park.create({ CarId: carId, UserId: userId, date: Date.now(), location, duration })
    return res.status(200).json(park)
  }

  async get (req, res) {
    const { userId } = req

    const parks = await Park.findAll({ where: { UserId: userId } })

    return res.status(200).json({ parks: parks })
  }
}
module.exports = new ParkController()
