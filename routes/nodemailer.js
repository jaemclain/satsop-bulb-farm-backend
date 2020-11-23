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

router.post('/email', (req, res, next) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName
    var email = req.body.email
    var inquiries = req.body.inquiries
    var content = req.body.message
    // var inquiries = "Planting instructions"
    // var content= "HELLO TESTING HERE"

    var mail = {
        from: email,
        to: process.env.HOSTMAIL,
        subject: inquiries,
        text: `${firstName} ${lastName} is sending you an email! \n
                Message from ${firstName} is listed below: \n
                ${content}`
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