const router = require("express").Router();
const db = require("../models");


//Get request for PlantingInstruction text
router.get("/PlantingInstructionText", (req, res) => {
    db.PlantingInstruction.find()
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})
//get one planting instruction text
router.get("/PlantingInstructionText/:id", (req, res) => {
    db.PlantingInstruction.findOne({
        _id: req.params.id
    })
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})

//Post request for PlantingInstruction text
router.post("/PlantingInstructionText", ({ body }, res ) => {
    db.PlantingInstruction.create(body).then(text =>
        res.json(text)).catch(err => 
            {
                res.json(err);
            });
    })

//Put request for PlantingInstruction text
router.put("/PlantingInstructionText", ({ body }, res ) => {
    db.PlantingInstruction.update(body
        )
    .then(text => res.json(text))
    .catch(err => {
        res.json(err);
      });
})
//update one planting instruction text
router.put("/PlantingInstructionText/:id", ({ body, params }, res ) => {
     db.PlantingInstruction.findByIdAndUpdate(
         {_id: params.id},
         {$set: body}
     )
     .then(text => res.json(text))
     .catch(err => {
        res.json(err);
      });
     
 })
//delete planting instructions
 router.delete("/PlantingInstructionText/:id", ({params}, res) => {
     db.PlantingInstruction.findByIdAndRemove({
         _id: params.id
     })
     .then(text => res.json(text))
     .catch(err => {
        res.json(err);
      });
 })

module.exports = router;