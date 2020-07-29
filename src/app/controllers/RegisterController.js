const { User } = require('../models')

class RegisterController {
  async register (req, res) {
    const { email, password, cpf, name } = req.body

    if (!this.checkemail(email)) {
      return res.status(401).json({ message: 'invalid email' })
    }
    if (!this.checkcpf(cpf)) {
      return res.status(401).json({ message: 'invalid cpf' })
    }

    const user = await User.create({ email, password, cpf, name })

    console.log(user)

    return res.json({
      user,
      token: user.generateToken()
    })
  }

  checkemail (email) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  checkcpf (cpf) {
    const re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    return re.test(cpf)
  }
}

module.exports = new RegisterController()
