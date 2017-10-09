const router = require('express').Router()
const db = require('../db');
const { NutrientsAPIID } = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/:nutname', (req, res, next) => {
  NutrientsAPIID.findOne({
    where: {
      name: req.params.nutname
    }
  })
    .then(nut => res.json(nut))
    .catch(next)
})
