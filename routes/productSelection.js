// Route - Product Selection
app.get("/product", (req, res) => {
    db.Product.find({})
      .then(dbProduct => {
        res.json(dbProduct);
      })
      .catch(err => {
        res.json(err);
      });
  });