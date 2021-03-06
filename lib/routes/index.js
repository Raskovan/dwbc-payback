let express = require('express')
let nconf = require('nconf')
let config = nconf.get()

module.exports = (function () {
  let router = express.Router()
  router.use(function (req, res, next) {
    if (req.headers['x-api-key'] !== config.API_KEY) return res.sendStatus(403)
    next()
  })

  router.use('/', require('./users_route'))
  router.use('/cities', require('./cities_route'))

  return router
}())
