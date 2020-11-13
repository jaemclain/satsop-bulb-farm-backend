const router = require("express").Router();
const db = require("../models");

// Route - User Collection - Find ALL Users
app.get("/user", (req, res) => {
  db.User.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});


// Create New User (ADMIN ONLY)
router.post("/admin/create", (req, res) => {
  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  }).then(newUser => {
    req.session.user = {
      email: newUser.email,
      id: newUser.id
    }
    res.status(200).send("okay")
  }).catch(err => {
    console.log(err);
    res.status(500).send("server error")
  })
});


// Update - User Page

router.put("/user/update", ({ body, params}, res) => {
  db.User.update(
    {
      _id: mongojs.ObjectId(params.id)
    },
    {
      $set: body
    }
  )
})




    module.exports = router;
