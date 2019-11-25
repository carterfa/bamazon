var db = require("../models");

module.exports = function (app) {

  // Displays all products on the page
  app.get("/api/products", function (req, res) {

    db.Product.findAll({}).then(function (results) {
      res.json(results);
    })

  });

  // Handles order submission
  app.put("/api/order", function (req, res) {

    let orderList = req.body.fullorder;

    // Goes through order values
    function runSearch(orderList) {
      let orderRes = [];
      let finished = false;
      let counter = 0;

      for (let i = 0; i < orderList.length; i++) {
        let productid = parseInt(orderList[i].productid);
        

        //Finds single product based on product id
        db.Product.findOne({
          where: {
            id: productid
          }
        }).then(function (result) {
          //Compares quantity ordered to stock
          let quantity = parseInt(orderList[i].quantity);

          let bought = parseInt(result.stock_quantity) - quantity;
          //Updates stock if enough to fulfill order
          if (bought < 0) {
            quantity = "Insufficient quantity!";
          } else {
            // Updates stock in database
            db.Product.update({
              stock_quantity: bought
            }, {
              where: {
                id: productid
              }
            })
          }

          //adds item to response object
          let currentItem = {
            "product_name": result.product_name, 
            "price": result.price, 
            "stock": quantity};
          orderRes.push(currentItem);
          counter++;
          if (counter === orderList.length){
            res.json(orderRes);
          }
        })
      }
      
    }

    runSearch(orderList);

  });


}