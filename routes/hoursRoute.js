const router = require("express").Router();
const db = require("../models");
const { rawListeners } = require("../models/faqModel");



//creating hours for each day
router.post("/companyInfoText/hours/:id", ({body, params}, res) => {
    db.Hours.create(body)
    .then(dbHours => {
        return db.companyInfo.findByIdAndUpdate(params.id, {$push: {hours: dbHours}}, {new: true})
    })
    .then(CompanyInfo =>{ 
        console.log(CompanyInfo)
        res.json(CompanyInfo)})
    .catch(err => {
        res.json(err);
      });
})

router.put("/hours/:id", ({body, params}, res) => {
    db.Hours.findByIdAndUpdate(
        params.id, {body}
    )
    .then(dbhours => {
        res.json(dbhours)
    })
    .catch(err => {
        res.json(err);
      });
})


module.exports = router;