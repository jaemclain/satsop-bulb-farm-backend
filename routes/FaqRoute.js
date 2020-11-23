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

//Get request for faq text
router.get("/faqText", (req, res) => {
    const loggedInUser = checkAuthStatus(req);
    console.log(loggedInUser);
    if (!loggedInUser) {
        return res.status(401).send("invalid token")
    }
    // console.log(db)
    db.faq.find()
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})

router.get("/faqText/:id", (req, res) => {
    db.faq.findOne({
        _id: req.params.id
    })
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})

//Post request for f&q text
router.post("/faqText", ({ body }, res ) => {
    console.log(db)
    db.faq.create(body).then(text =>
        res.json(text)).catch(err => 
            {
                res.json(err);
            });
    })

//Put request for f&q text
router.put("/faqText", ({ body }, res ) => {
    db.faq.update(body
        )
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})

router.put("/faqText/:id", ({ body, params }, res ) => {
     db.faq.findByIdAndUpdate(
         {_id: params.id},
         {$set: body}
     )
     .then(text => res.json(text))
     .catch(err => {
        res.json(err);
      });
     
 })

 router.delete("/faqText/:id", (req, res ) => {
    console.log("hello")
   db.faq.findOneAndRemove(
       {_id: req.params.id})
   .then(text => res.json(text))
   .catch(err => {
      res.json(err);
    });
   
})

module.exports = router;