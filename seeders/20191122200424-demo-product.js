'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Products', [{
        product_name: 'Jar of Live Bees',
        department: "Home",
        price: 10.99,
        stock_quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_name: 'Jiff Beezboz Biography',
        department: "Books",
        price: 5.99,
        stock_quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_name: 'Once Upon a Story',
        department: "Books",
        price: 12.99,
        stock_quantity: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Products', null, {});
    
  }
};
