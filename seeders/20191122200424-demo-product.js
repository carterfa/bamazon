"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("Products", [
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
    
    ], 
    
    {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete("Products", null, {});
    
  }
};
