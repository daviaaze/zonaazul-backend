const { User } = require('../models')

class UserController {
  async info (req, res) {
    const { userId } = req

    const user = await User.findOne({ where: { id: userId } })

    return res.json({
      user: {
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        wallet: user.wallet,
        buys: user.buy,
        parks: user.park,
        cars: user.cars
      }
    })
  }
}

module.exports = new UserController()
