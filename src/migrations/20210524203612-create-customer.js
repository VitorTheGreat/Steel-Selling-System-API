'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      document: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      rg: {
        type: Sequelize.STRING,
        unique: true
      },
      contact: {
        type: Sequelize.STRING
      },
      secondary_contact: {
        type: Sequelize.STRING
      },
      postal_code: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      neighborhood: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      fk_state_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'States',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};