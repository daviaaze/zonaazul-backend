const { User } = require('../models')
const { Op } = require('sequelize')
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
    const checkUser = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { cpf }
        ]
      }
    })
    if (checkUser) {
      if (checkUser.email === email) return res.status(401).json({ message: 'Email já registrado' })
      if (checkUser.cpf === cpf) return res.status(401).json({ message: 'CPF já registrado' })
    }

    if (!checkemail(email)) {
      return res.status(401).json({ message: 'E-mail inválido!' })
    }
    if (!(CPF.validate(cpf))) {
      return res.status(401).json({ message: 'CPF inválido' })
    }
    if (!checkpassword(password)) {
      return res.status(401).json({ message: 'senha inválida' })
    }

    const user = await User.create({ email, password, cpf, name })

    return res.json({
      user,
      token: user.generateToken()
    })
  }
}

module.exports = new RegisterController()
