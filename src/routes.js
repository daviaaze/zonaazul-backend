const routes = require('express').Router()

routes.use('/user', require('./user.routes'))
routes.use('/seller', require('./seller.routes'))

module.exports = routes
