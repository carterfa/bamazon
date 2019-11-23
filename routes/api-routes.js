var db = require("../models");

module.exports = function (app) {

  // Displays all products on the page
  app.get("/api/products", function (req, res) {

    db.Product.findAll({}).then(function (results) {
      res.json(results);
    })

  });

  app.put("/api/order", function (req, res) {

    let orderList = req.body.fullorder;

    for (let i = 0; i < orderList.length; i++) {
      let productid = parseInt(orderList[i].productid);
      let quantity = parseInt(orderList[i].quantity);

      db.Product.findOne({
        where: {
          id: productid
        }
      }).then(function (result) {
        let bought = parseInt(result.stock_quantity) - quantity;
        
        if (bought < 0) {
          message += "Not enough stock of " +result.product_name+"!";
        } else {

          db.Product.update({
            stock_quantity: bought
          }, {
            where: {
              id: productid
            }
          })

        }

      })


    }

    res.end();

  });


}