const router = require("express").Router();
const db = require("../models");
const nodemailer = require("nodemailer");
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: process.env.SERVER2,
    // port: 587,
    secure: false,
    auth: {
        user: process.env.USEREMAIL2,
        pass: process.env.PASSWORD2
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

router.post('/orderDetails', (req, res, next) => {
    console.log(req.body);

    var orderId = req.body.detailsKey.orderId
    var totalAmount = req.body.detailsKey.customerTotalAmount
    var purchaseList = req.body.listKey
    var customerEmail = req.body.detailsKey.customerEmail
    var customerAddress = req.body.detailsKey.customerAddress 
    var customerCity = req.body.detailsKey.customerCity
    var customerState = req.body.detailsKey.customerState
    var customerZipCode = req.body.detailsKey.customerZipCode
    var customerCountry = req.body.detailsKey.customerCountry

    console.log()
    
    var mail = {
        from: process.env.HOSTMAIL2, 
        to: "satsopbulbfarm7@gmail.com",
        subject: `Order Confirmation #: ${orderId}`,
        text: `Below, you will find details about the orders that you have made with us! 
        \n\n Mailing Address:
        \n\n ${customerAddress}
        \n\n ${customerCity},${customerState} ${customerZipCode}
        \n\n Here are the list of your orders! 
        \n\n ${purchaseList.map(purchaseObj => {return (`${purchaseObj.name} with $${purchaseObj.price}`)})} 
        \n\n Total of your purchase will be ${totalAmount} 
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