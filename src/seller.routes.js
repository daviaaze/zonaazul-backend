const routes = require('express').Router()

const SellerController = require('./app/controllers/SellerController')
const sellerAuthMiddleware = require('./app/middleware/sellerAuth')
const BuyController = require('./app/controllers/BuyController')

routes.post('/authenticate', SellerController.auth)

routes.use(sellerAuthMiddleware)

routes.post('/buy/register', BuyController.register)

routes.get('/home', SellerController.getParks)

module.exports = routes
