const router = require("express").Router();
const db = require("../models")

//Get request for faq text
router.get("/faqText", (req, res) => {
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

router.put("/faqText/:id", ({ body }, res ) => {
     db.faq.findByIdAndUpdate(
         {_id: mongojs.Object(req.params.id)},
         {$set: body}
     )
     .then(text => res.json(text))
     .catch(err => {
        res.json(err);
      });
     
 })

module.exports = router;