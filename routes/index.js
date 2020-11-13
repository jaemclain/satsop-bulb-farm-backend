const router = require("express").Router()

const Home = require("./homeRoute")
const faq = require("./FaqRoute")
const Product = require("./productRoute")
const User = require("./userRoUts")
const PlantingInstructions = require("./PlantingRoute")


router.use(Home)
router.use(faq)
router.use(Product)
router.use(User)
router.use(PlantingInstructions)

  module.exports = router
  