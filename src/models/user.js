'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email_verified: DataTypes.BOOLEAN,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fk_role_id: {
      type: DataTypes.STRING,
      references: {
        model: 'roles',
        key: 'id'
      },
      allowNull: false
    },
    fk_storage_id: {
      type: DataTypes.STRING,
      references: {
        model: 'storages',
        key: 'id'
      },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};