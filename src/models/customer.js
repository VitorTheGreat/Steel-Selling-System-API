'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Customer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    document: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    rg: {
      type: DataTypes.STRING,
      unique: true
    },
    contact: {
      type: DataTypes.STRING
    },
    secondary_contact: {
      type: DataTypes.STRING
    },
    postal_code: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    neighborhood: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    fk_state_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'states',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};