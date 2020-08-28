const { User } = require('../models')

class AuthController {
  async info (req, res) {
    const { userId } = req

    const user = await User.findOne({ where: { id: userId } })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    return res.json({
      user
    })
  }
}

module.exports = new AuthController()
