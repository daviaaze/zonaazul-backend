const { Seller, Park, Car } = require('../models')
const { Op } = require('sequelize')

class SellerController {
  async auth (req, res) {
    const { email, password } = req.body

    const seller = await Seller.findOne({ where: { email } })

    if (!seller) {
      return res.status(401).json({ message: 'User not found' })
    }
    if (!(await seller.checkPassword(password))) {
      return res.status(401).json({ message: 'Incorrect Password' })
    }
    return res.json({
      seller: {
        name: seller.name
      },
      token: seller.generateToken()
    })
  }

  getParks (req, res) {
    const findCars = async (parks) => {
      return Promise.all(
        parks.map(async park => {
          console.log("hi")
          const car = await Car.findByPk(park.CarId)
          park.dataValues.car = car
          return park
        })
      )
    }
    const date = new Date()
    date.setHours(date.getHours() - 2)
    Park.findAll({
      where: {
        createdAt: {
          [Op.gt]: date
        }
      }
    }).then((parks) => {
      findCars(parks).then(list => {
        res.status(200).json(list)
      })
    })
  }
}

module.exports = new SellerController()
