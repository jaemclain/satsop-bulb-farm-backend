const router = require("express").Router();
const db = require("../models");

//Get request for f&q text
router.get("/f&qText", (req, res) => {
    db.f&q.find()
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})

router.get("/f&qText/:id", (req, res) => {
    db.f&q.findOne({
        _id: req.params.id
    })
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})

//Post request for f&q text
router.post("/f&qText", ({ body }, res ) => {
    db.f&q.create(body).then(text =>
        res.json(text)).catch(err => 
            {
                res.json(err);
            });
    })

//Put request for f&q text
router.put("/f&qText", ({ body }, res ) => {
    db.f&q.update(body
        )
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})

router.put("/f&qText/:id", ({ body }, res ) => {
     db.f&q.findByIdAndUpdate(
         {_id: mongojs.Object(req.params.id)},
         {$set: body}
     )
     .then(text => res.json(text))
     .catch(err => {
        res.json(err);
      });
     
 })

module.exports = router;