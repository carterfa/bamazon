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
            quantity = "Insufficient quantity!  Only " + result.stock_quantity + " in stock!";
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
            "stock": quantity
          };
          orderRes.push(currentItem);
          counter++;
          if (counter === orderList.length) {
            res.json(orderRes);
          }
        })
      }

    }

    runSearch(orderList);

  });

  app.get("/api/reset", function (req, res) {

    db.Product.destroy({
      where: {},
      truncate: true
    }).then(function () {
      db.Product.bulkCreate([
        {
          product_name: "Jar of Live Bees",
          department: "Home",
          price: 10.99,
          stock_quantity: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Rusty Bucket",
          department: "Home",
          price: 2.99,
          stock_quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Sad Clown Portrait",
          department: "Home",
          price: 99.99,
          stock_quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Jiff Beezboz Biography",
          department: "Books",
          price: 5.99,
          stock_quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Once Upon a Story",
          department: "Books",
          price: 12.99,
          stock_quantity: 25,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          product_name: "Classic Literature",
          department: "Books",
          price: 7.99,
          stock_quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          product_name: "Strange Romance Novel",
          department: "Books",
          price: 8.99,
          stock_quantity: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          product_name: "Nontondo Swotch",
          department: "Electronics",
          price: 108.99,
          stock_quantity: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          product_name: "PS333",
          department: "Electronics",
          price: 599.99,
          stock_quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          product_name: "ExBoxCube",
          department: "Electronics",
          price: 499.99,
          stock_quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ]);

    })

    res.end();

  })


}