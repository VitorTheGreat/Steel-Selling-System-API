'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Selling_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Selling_Items.init({
    qty: {
      type: DataTypes.DOUBLE(8,2)
    },
    list_price: {
      type: DataTypes.DOUBLE(8,2)
    },
    selling_price: {
      type: DataTypes.DOUBLE(8,2)
    },
    sub_total: {
      type: DataTypes.DOUBLE(8,2)
    },
    percent_table: {
      type: DataTypes.DOUBLE(8,2)
    },
    fk_product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id"
      }
    },
    fk_storage_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "storages",
        key: "id"
      }
    },
    fk_selling_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "sellings",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Selling_Items',
  });
  return Selling_Items;
};