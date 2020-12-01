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

router.post('/orderDetails', (req, res, next) => {
    var firstName = req.body.detailsKey.payer.name.given_name
    var lastName = req.body.detailsKey.payer.name.surname
    var orderId = req.body.detailsKey.id
    var totalAmount = req.body.detailsKey.purchase_units[0].amount.value
    var description = req.body.detailsKey.purchase_units[0].description
    var purchaseList = req.body.listKey
    var customerEmail = req.body.detailsKey.purchase_units[0].payee.email_address
    var customerAddress = req.body.detailsKey.purchase_units[0].shipping.address.address_line_1
    var customerCity = req.body.detailsKey.purchase_units[0].shipping.address.admin_area_2
    var customerState = req.body.detailsKey.purchase_units[0].shipping.address.admin_area_1
    var customerZipCode = req.body.detailsKey.purchase_units[0].shipping.address.postal_code
    var customerCountry = req.body.detailsKey.purchase_units[0].shipping.address.country_code
    
    var mail = {
        from: process.env.HOSTMAIL, 
        to: customerEmail,
        subject: `${description} Order Confirmation # ${orderId}`,
        text: `Hello ${firstName} ${lastName}! 
        \n\n Below, you will find details about the orders that you have made with us! 
        \n\n Mailing Address:
        \n\n ${customerAddress}
        \n ${customerCity},${customerState} ${customerZipCode}
        \n ${customerCountry}
        \n\n Here is the list of your orders! 
        \n\n ${purchaseList.map(purchaseObj => {return (` ${purchaseObj.name} with $ ${purchaseObj.price}`)})} 
        \n\n Total of your purchase will be $ ${totalAmount} 
        \n\n Thank you for ordering from us! 
        \n Have a good day!`
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