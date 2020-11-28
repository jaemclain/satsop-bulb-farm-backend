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

//Get request for PlantingInstruction text
router.get("/PlantingInstructionText", (req, res) => {
    // const loggedInUser = checkAuthStatus(req);
    // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
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
    // const loggedInUser = checkAuthStatus(req);
    // // console.log(loggedInUser);
    // if (!loggedInUser) {
    //     return res.status(401).send("invalid token")
    // }
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