'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Selling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Selling.init({
    paid_value: {
      type: DataTypes.DOUBLE(8, 2)
    },
    discount: {
      type: DataTypes.DOUBLE(8, 2)
    },
    total_price_with_discount: {
      type: DataTypes.DOUBLE(8, 2)
    },
    total: {
      type: DataTypes.DOUBLE(8, 2)
    },
    change: {
      type: DataTypes.DOUBLE(8, 2)
    },
    selling_status: {
      type: DataTypes.STRING(30)
    },
    payment_method: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.TEXT
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id"
      }
    },
    fk_customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "customers",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Selling',
  });
  return Selling;
};