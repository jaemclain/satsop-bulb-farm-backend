const router = require("express").Router();
const db = require("../models");
const bcrypt =require("bcrypt")

// const databaseURL = User
// const collections = ["Products"]

// Route - ALL Products
router.get("/products", (req, res) => {
    db.Products.find({})
    .then(dbProduct => {
        res.json(dbProduct);
    }).catch(err => {
        res.json(err);
    });
})

  // Route - Find by ID
  router.get("/product/:id", (req, res) => {
      db.Products.findOne(
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
  })

// Route - Create New Product
router.post("/product/create", ({ body }, res) => {
  db.Products.create(body)
    .then(newProduct => {
      res.status(200).send("okay")
    }).catch(err => {
      console.log(err);
      res.status(500).send("server error")
    })
});


// Route - Update Product
router.put('/update/product/:id', ({body, params}, res, next) => {
    let id = {
      _id: params.id
    };

    db.Products.update({_id: id}, {$set: body}, (err, result) => {
      if(err) {
        throw err;
      }
      res.send('info updated sucessfully');
    });
});



// Route - Delete
router.delete("/product/:id", (req, res) => {
    db.Products.remove(
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


  router.get("/products", (req, res) => {
    res.render("products", { user: req.session.user })
})

  module.exports = router;