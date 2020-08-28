const routes = require('express').Router()

const AuthController = require('./app/controllers/AuthController')
const RegisterController = require('./app/controllers/RegisterController')
const authMiddleware = require('./app/middleware/auth')
const CarController = require('./app/controllers/CarController')
const ParkController = require('./app/controllers/ParkController')
const UserController = require('./app/controllers/UserController')

routes.post('/authenticate', AuthController.auth)
routes.post('/register', RegisterController.register)

routes.use(authMiddleware)

routes.post('/car/register', CarController.register)
routes.get('/car/get', CarController.get)
routes.get('/car/get/:carId', CarController.getById)
routes.post('/car/remove', CarController.remove)
routes.post('/park/register', ParkController.register)
routes.get('/park/get', ParkController.get)
routes.get('/info', UserController.info)

module.exports = routes
