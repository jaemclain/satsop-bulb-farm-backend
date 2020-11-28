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
    console.log("CHECK HERE", loggedInUser)
    return loggedInUser;
}


//Get request for home text
router.get("/homeText", (req, res) => {
    // const loggedInUser = checkAuthStatus(req);
    // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
    db.Home.find()
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });
})

router.get("/homeText/:id", (req, res) => {
    db.Home.findOne({
        _id: req.params.id
    })
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });
})

//Post request for home text
router.post("/homeText", ({ body }, res) => {
    db.Home.create(body).then(text =>
        res.json(text)).catch(err => {
            res.json(err);
        });
})

//Put request for home text
router.put("/homeText", ({ body }, res) => {
    // const loggedInUser = checkAuthStatus(req);
    // // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
    db.Home.update(body
    )
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });
})

router.put("/homeText/:id", ({ body, params }, res) => {
    // const loggedInUser = checkAuthStatus(req);
    // // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
    db.Home.findByIdAndUpdate(
        { _id: params.id },
        { $set: body }

    )
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });

})

router.delete("/homeText/:id", ({ params }, res) => {
    db.Home.findByIdAndRemove({ _id: params.id })
        .then(text => res.json(text))
        .catch(err => {
            res.json(err);
        });
})

// router.delete("/homeText/:id", ({ params }, res) => {
//     db.Home.findByIdAndRemove({ _id: params.id })
//         .then(text => res.json(text))
//         .catch(err => {
//             res.json(err);
//         });
// })


module.exports = router;