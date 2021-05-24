'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  State.init({
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    uf: {
      type: DataTypes.STRING(3),
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'State',
  });
  return State;
};