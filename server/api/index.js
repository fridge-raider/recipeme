const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/receipts', require('./receipts'))
router.use('/orders', require('./orders'))
router.use('/ingredients', require('./ingredients'))
router.use('/s3', require('./upload'))
router.use('/recipes', require('./recipes'))
router.use('/nutrients', require('./nutrientsfindID'))
router.use('/favorites', require('./favorites'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

