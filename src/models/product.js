'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ean: {
      type: DataTypes.STRING(13)
    },
    fractioned_qty: {
      type: DataTypes.DOUBLE(8, 2)
    },
    unit_price: {
      type: DataTypes.DOUBLE(8, 2),
      allowNull: false
    },
    buy_price: {
      type: DataTypes.DOUBLE(8, 2),
      allowNull: false
    },
    cost_price: {
      type: DataTypes.DOUBLE(8, 2),
      allowNull: false
    },
    selling_price: {
      type: DataTypes.DOUBLE(8, 2),
      allowNull: false
    },
    profit: {
      type: DataTypes.DOUBLE(8, 2),
      allowNull: false
    },
    ipi: {
      type: DataTypes.STRING
    },
    icms: {
      type: DataTypes.STRING
    },
    ncm: {
      type: DataTypes.STRING
    },
    csosn: {
      type: DataTypes.STRING
    },
    fk_supplier_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "suppliers",
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};