const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')
  console.log(token)
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    if(!decoded.seller_id) return res.status(401).json({ message: 'Invalid Token' })
    req.sellerId = decoded.seller_id
    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}
