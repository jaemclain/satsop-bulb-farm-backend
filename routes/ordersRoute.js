const router = require("express").Router();
const db = require("../models")
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
    console.log("CHECK HERE", loggedInUser)
    return loggedInUser;
}

//Get request for Order text
router.get("/orders", (req, res) => {
    // const loggedInUser = checkAuthStatus(req);
    // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
    // console.log(db)
    db.Order.find()
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });
})

router.get("/orders/:id", (req, res) => {
    db.Order.findOne({
        _id: req.params.id
    })
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });
})

//Post request for f&q text
router.post("/orders", ({ body }, res) => {
    console.log(db)
    // const loggedInUser = checkAuthStatus(req);
    // // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
    db.Order.create(body).then(text =>
        res.json(text)).catch(err => {
            res.json(err);
        });
})

//Put request for f&q text
router.put("/orders", ({ body }, res) => {
    db.Order.update(body
    )
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });
})

router.put("/orders/:id", ({ body, params }, res) => {
    // const loggedInUser = checkAuthStatus(req);
    // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
    db.Order.findByIdAndUpdate(
        { _id: params.id },
        { $set: body }
    )
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });

})

router.delete("/orders/:id", (req, res) => {
    console.log("hello")
    // const loggedInUser = checkAuthStatus(req);
    // // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
    db.Order.findOneAndRemove(
        { _id: req.params.id })
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });

})

module.exports = router;