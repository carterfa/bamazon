//Product model with name, department, price, stock amount

module.exports = function (sequelize, DataTypes) {

    var Product = sequelize.define("Product", {

        product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,140]
        }
      },

      department: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,140]
          }
      },

      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0.01
        }
      },

      stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
      }
    });

    return Product;
  };
  