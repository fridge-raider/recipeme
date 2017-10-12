const Yapp_id = process.env.YUMMLY_ID
const Yapp_key = process.env.YUMMLY_KEY

const router = require('express').Router()
const Sequelize = require('sequelize')

module.exports = router

router.get('/')