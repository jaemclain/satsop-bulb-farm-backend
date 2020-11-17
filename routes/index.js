const router = require("express").Router()

const Home = require("./homeRoute")
const faq = require("./FaqRoute")
const Product = require("./productRoute")
const User = require("./userRoUts")
const PlantingInstructions = require("./PlantingRoute")
const companyInfoText = require("./companyInfoRoute")


router.use(Home)
router.use(faq)
router.use(Product)
router.use(User)
router.use(PlantingInstructions)
router.use(companyInfoText)

  module.exports = router
  