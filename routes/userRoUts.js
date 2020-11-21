const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request } = require("express");

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
  console.log(req.body)
  db.User.findOne({
  email: req.body.email 
  }).then(async user => {
    console.log("FOUND USER", user)
    // console.log('CHECKING PASSWORD', await user.validatePassword(req.body.userPassword))
      //check if user entered password matches db password
      if (!user) {
          // req.session.destroy();
          return res.status(401).redirect("/error")

      } else if (await user.validatePassword(req.body.password)) {
          // req.session.user = {
          //     email: user.email,
          // }
          const userTokenInfo = {
            email: user.email,
            id: user._id,
            name: user.name
          }
          const token = jwt.sign(userTokenInfo,"secretString",{expiresIn:"2h"});
          return res.status(200).json({token:token})
          //return res.redirect("/admin/dashboard")
          // return res.json({
          //   email:user.email
          // })
      }
      // else {
          // req.session.destroy();
      //     return res.status(401).redirect("/error")
      // }
  })
})

// Web Tokens
const checkAuthStatus = request =>{
if(!request.headers.authorization) {
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
console.log(loggedInUser)
return loggedInUser;
}


// Secret String
router.get("/secrets", (req,res)=>{
  const loggedInUser = checkAuthStatus(req);
  console.log(loggedInUser);
  if(!loggedInUser){
    return res.status(401).send("invalid token")
  }
  res.status(200).send("valid token");
})


// Logout 
// router.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.redirect("/")
// })

// Session 
// router.get("/sessiondata", (req, res) => {
//   res.json(req.session)
// })


module.exports = router;
