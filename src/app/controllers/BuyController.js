const { User, Buy } = require('../models')
class BuyController {
  async register (req, res) {
    const { cpf, value } = req.body

    const user = await User.findOne({ where: { cpf } })

    const buy = await Buy.create({ value, date: Date.now(), UserId: user.id, SellerId: req.sellerId })

    user.setDataValue('wallet', user.wallet + value)

    await user.save()

    return res.status(200).json({ buy })
  }
}
module.exports = new BuyController()
