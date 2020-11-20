const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

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
  db.User.update({ _id: params.id }, { $set: body }, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send("okay");
  });
})

// Route - Delete
router.delete("/user/:id", (req, res) => {
  db.User.remove(
    {
      _id: req.params.id
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    }
  );
});

// User Login
router.post('/login', (req, res) => {
  db.User.findOne({
      where: { email: req.body.userEmail }
  }).then(user => {
      //check if user entered password matches db password
      if (!user) {
          req.session.destroy();
          return res.status(401).redirect("/error")

      } else if (bcrypt.compareSync(req.body.userPassword, user.password)) {
          req.session.user = {
              email: user.email,
          }
          return res.redirect("/admin/dashboard")
      }
      else {
          req.session.destroy();
          return res.status(401).redirect("/error")
      }
  })
})

// Logout 
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/")
})

// Session 
router.get("/sessiondata", (req, res) => {
  res.json(req.session)
})


module.exports = router;
