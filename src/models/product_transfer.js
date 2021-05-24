'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product_Transfer.init({
    origin_storage: {
      type: DataTypes.INTEGER
    },
    destiny_storage: {
      type: DataTypes.INTEGER
    },
    send_responsible: {
      type: DataTypes.STRING
    },
    receive_responsible: {
      type: DataTypes.STRING
    },
    product_qty: {
      type: DataTypes.DOUBLE(8,2)
    },
    fk_product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id"
      }
    },
    status: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Product_Transfer',
  });
  return Product_Transfer;
};