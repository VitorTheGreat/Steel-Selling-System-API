'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Supplier.init({
    registered_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    cnpj: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    ie: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    neighborhood: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    postal_code: {
      type: DataTypes.STRING
    },
    fk_state_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "states",
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};