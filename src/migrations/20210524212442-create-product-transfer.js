'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product_Transfers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      origin_storage: {
        type: Sequelize.INTEGER
      },
      destiny_storage: {
        type: Sequelize.INTEGER
      },
      send_responsible: {
        type: Sequelize.STRING
      },
      receive_responsible: {
        type: Sequelize.STRING
      },
      product_qty: {
        type: Sequelize.DOUBLE(8,2)
      },
      fk_product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id"
        }
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Product_Transfers');
  }
};