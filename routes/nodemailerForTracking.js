const router = require("express").Router();
const db = require("../models");
const nodemailer = require("nodemailer");
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: process.env.SERVER,
    // port: 587,
    secure: false,
    auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASSWORD
    }
});

// verifying the connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages!");
    }
});

router.post('/orderTracking', (req, res, next) => {
    var trackingNumber = req.body.trackStatus
    var orderId = req.body.userInfo.orderId
    var customerEmail = req.body.userInfo.customerEmail
    var customerAddress = req.body.userInfo.customerAddress
    var customerCity = req.body.userInfo.customerCity
    var customerState = req.body.userInfo.customerState
    var customerZipCode = req.body.userInfo.customerZipCode
    var customerCountry = req.body.userInfo.customerCountry
    
    var mail = {
        from: process.env.HOSTMAIL, 
        to: customerEmail,
        subject: `Updates On Order Confirmation # ${orderId}`,
        text: `Hello! 
        \n\n Your order is on the way!
        \n\n Below you will find the tracking number associated with your orders
        \n Tracking #${trackingNumber}
        \n\n And it will be sent to
        \n ${customerAddress}
        \n ${customerCity},${customerState} ${customerZipCode}
        \n ${customerCountry}
        \n\n If you have any questions, feel free to reach out to us!
        \n\n Thank you for ordering from us!
        \n\n Have a good day!`
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
})

module.exports = router;