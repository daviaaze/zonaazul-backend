const { Car } = require('../models')
class CarController {
  async register (req, res) {
    const { plate, model } = req.body

    const reg = /[a-zA-Z]{3}[0-9]{4}/

    if (!model) {
      return res.status(401).json({ message: 'Missing Model' })
    }
    if (!plate) {
      return res.status(401).json({ message: 'Missing plate' })
    }
    if (!reg.test(plate)) {
      return res.status(401).json({ message: 'Invalid plate' })
    }
    const car = await Car.create({ plate, model, UserId: req.userId })

    await car.save()

    return res.status(200).json({ car })
  }

  async get (req, res) {
    const cars = await Car.findAll({ where: { UserId: req.userId } })

    return res.status(200).json({ cars })
  }

  async getById (req, res) {
    const car = await Car.findByPk(req.params.carId)

    return res.status(200).json({ car })
  }

  async remove (req, res) {
    await Car.destroy({
      where: {
        id: req.params.id
      }
    })
    return res.status(200).send()
  }
}

module.exports = new CarController()
