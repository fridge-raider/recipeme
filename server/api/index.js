const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/receipts', require('./receipts'))
router.use('/orders', require('./orders'))
router.use('/s3', require('./upload'))
router.use('/recipes', require('./recipes'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
