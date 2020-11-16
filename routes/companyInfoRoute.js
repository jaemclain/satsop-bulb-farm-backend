const router = require("express").Router();
const db = require("../models");


//Get request for companyInfo text
router.get("/companyInfoText", (req, res) => {
    db.companyInfo.find()
    .then(text => res.json(text))
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
router.post("/companyInfoText", ({ body }, res ) => {
    db.companyInfo.create(body).then(text =>
        res.json(text)).catch(err => 
            {
                res.json(err);
            });
    })

//Put request for companyInfo text
router.put("/companyInfoText", ({ body }, res ) => {
    db.companyInfo.update(body
        )
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})

router.put("/companyInfoText/:id", ({ body, params }, res ) => {
     db.companyInfo.findByIdAndUpdate(
        {_id: params.id},
        {$set: body}
         
     )
     .then(text => res.json(text))
     .catch(err => {
        res.json(err);
      });
     
 })


module.exports = router;