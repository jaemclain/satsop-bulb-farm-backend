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




  module.exports = router;
