const { User } = require('../models')

class AuthController {
  async auth (req, res) {
    try {
      const { email, password } = req.body

      if (!email) return res.status(402).json({ message: 'var email not found' })
      if (!password) return res.status(402).json({ message: 'var password not found' })

      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.status(402).json({ message: 'Usuário não encontrado' })
      }
      if (!(await user.checkPassword(password))) {
        return res.status(402).json({ message: 'Senha incorreta' })
      }
      return res.json({
        user,
        token: user.generateToken()
      })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new AuthController()
