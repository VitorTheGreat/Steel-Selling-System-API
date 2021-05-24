'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Control_Storage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Control_Storage.init({
    qty: {
      type: DataTypes.DOUBLE(8, 2)
    },
    selling_unit: {
      type: DataTypes.STRING(10)
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
  }, {
    sequelize,
    modelName: 'Control_Storage',
  });
  return Control_Storage;
};