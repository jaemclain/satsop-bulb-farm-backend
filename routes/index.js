const router = require("express").Router()

const Home = require("./homeRoute")
const faq = require("./FaqRoute")
const Product = require("./productRoute")
const User = require("./userRoUts")
const PlantingInstructions = require("./PlantingRoute")
const companyInfoText = require("./companyInfoRoute")
const Hours = require("./hoursRoute")
const Order = require("./ordersRoute")
const nodemailer = require("./nodemailer")

router.use(Home)
router.use(faq)
router.use(Product)
router.use(User)
router.use(PlantingInstructions)
router.use(companyInfoText)
router.use(Hours)
router.use(Order)
router.use(nodemailer)

  module.exports = router
  