const router = require("express").Router();
const db = require("../models");

// Route - User Collection
router.get("/user", (req, res) => {
  db.User.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});


// Create New User (ADMIN ONLY)
router.post("/admin/create", ({ body }, res) => {
  console.log(db)
  db.User.create(body)
    .then(newUser => {
      res.status(200).send("okay")
    }).catch(err => {
      console.log(err);
      res.status(500).send("server error")
    })
});


// Update - User Page

router.put("/user/update/:id", ({ body, params }, res) => {
  db.User.update(
    {
      _id: params.id
    },
    {
      $set: body
    }
  )
})




module.exports = router;
