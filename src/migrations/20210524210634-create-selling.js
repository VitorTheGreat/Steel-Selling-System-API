'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sellings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paid_value: {
        type: Sequelize.DOUBLE(8, 2)
      },
      discount: {
        type: Sequelize.DOUBLE(8, 2)
      },
      total_price_with_discount: {
        type: Sequelize.DOUBLE(8, 2)
      },
      total: {
        type: Sequelize.DOUBLE(8, 2)
      },
      change: {
        type: Sequelize.DOUBLE(8, 2)
      },
      selling_status: {
        type: Sequelize.STRING(30)
      },
      payment_method: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      fk_user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      },
      fk_customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "customers",
          key: "id"
        }
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
    await queryInterface.dropTable('Sellings');
  }
};