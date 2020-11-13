const router = require("express").Router();
const db = require("../models");

// const databaseURL = User
// const collections = ["Products"]

// Route - ALL Products
router.get("/products", (req, res) => {
    db.products.find({})
    .then(dbProduct => {
        res.json(dbProduct);
    }).catch(err => {
        res.json(err);
    });
})


// Route - Find by ID
router.get("/product/:id", (req, res) => {
    db.products.findOne(
        {
            _id: mongojs.Object(req.params.id)
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

// Route - Find by Name
router.get("/product/name", (req, res) => {
    db.products.findOne(
        {
            _id: mongojs.Object(req.params.name)
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


// Route - Update Product
router.put('/update/product/:id', ({body}, res, next) => {
    let id = {
      _id: ObjectID(req.params.id)
    };

    db.products.update({_id: id}, {$set: body}, (err, result) => {
      if(err) {
        throw err;
      }
      res.send('info updated sucessfully');
    });
});



// Route - Delete
router.delete("/delete/:id", (req, res) => {
    db.products.remove(
      {
        _id: mongojs.ObjectID(req.params.id)
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