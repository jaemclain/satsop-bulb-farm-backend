const router = require("express").Router();
const db = require("../models");
const jwt = require("jsonwebtoken");

const checkAuthStatus = request => {
    if (!request.headers.authorization) {
        return false
    }
    token = request.headers.authorization.split(" ")[1]

    const loggedInUser = jwt.verify(token, 'secretString', (err, data) => {
        if (err) {
        }
        else {
            return data
        }
    });
    // console.log("CHECK HERE", loggedInUser)
    return loggedInUser;
}

//Get request for companyInfo text
router.get("/companyInfoText", (req, res) => {
    // const loggedInUser = checkAuthStatus(req);
    // // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
    db.companyInfo.find().populate("hours")
        .then(text => {
            console.log("TEXT", text);
            res.status(200).json(text)
        })
        .catch(err => {
            res.json(err);
        });
})

router.get("/companyInfoText/:id", (req, res) => {
    db.companyInfo.findOne({
        _id: req.params.id
    })
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });
})

//Post request for companyInfo text
router.post("/companyInfoText", ({ body }, res) => {
    db.companyInfo.create(body).then(text =>
        res.json(text)).catch(err => {
            res.json(err);
        });
})

//Put request for companyInfo text
router.put("/companyInfoText", ({ body }, res) => {
    // const loggedInUser = checkAuthStatus({body});
    // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
    db.companyInfo.update(body
    )
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });
})

router.put("/companyInfoText/:id", ({ body, params }, res) => {
    db.companyInfo.findByIdAndUpdate(
        { _id: params.id },
        { $set: body }

    )
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });

})

module.exports = router;