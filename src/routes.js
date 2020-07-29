const routes = require('express').Router()

const authMiddleware = require('./app/middleware/auth')
const AuthController = require('./app/controllers/AuthController')
const RegisterController = require('./app/controllers/RegisterController')

routes.post('/authenticate', AuthController.auth)
routes.post('/register', RegisterController.register)

routes.use(authMiddleware)

routes.get('/home', (req, res) => {
  return res.status(200).send()
})

module.exports = routes
