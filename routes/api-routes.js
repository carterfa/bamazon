var db = require("../models");

module.exports = function(app) {

    // Displays all products on the page
  app.get("/api/products", function (req, res) {

    db.Product.findAll({}).then(function (results) {
      res.json(results);
    })

  });

  app.put("/api/order", function (req, res){


  });

    
}