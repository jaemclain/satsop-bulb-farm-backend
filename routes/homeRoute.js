const router = require("express").Router();
const db = require("../models");


//Get request for home text
router.get("/homeText", (req, res) => {
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
router.post("/homeText", ({ body }, res ) => {
    db.Home.create(body).then(text =>
        res.json(text)).catch(err => 
            {
                res.json(err);
            });
    })

//Put request for home text
router.put("/homeText", ({ body }, res ) => {
    db.Home.update(body
        )
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})

router.put("/homeText/:id", ({ body, params }, res ) => {
     db.Home.findByIdAndUpdate(
        {_id: params.id},
        {$set: body}
         
     )
     .then(text => res.json(text))
     .catch(err => {
        res.json(err);
      });
     
 })

module.exports = router;