const { User } = require('../models')
const CPF = require('cpf-check')
class RegisterController {
  async register (req, res) {
    const { email, password, cpf, name } = req.body

    function checkemail (email) {
      const re = /\S+@\S+\.\S+/
      return re.test(email)
    }
    function checkpassword (password) {
      const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      return re.test(password)
    }
    if (!checkemail(email)) {
      return res.status(401).json({ message: 'invalid email' })
    }
    if (!(CPF.validate(cpf))) {
      return res.status(401).json({ message: 'invalid cpf' })
    }
    if (!checkpassword(password)) {
      return res.status(401).json({ message: 'invalid password' })
    }

    const user = await User.create({ email, password, cpf, name })

    return res.json({
      user,
      token: user.generateToken()
    })
  }
}

module.exports = new RegisterController()
