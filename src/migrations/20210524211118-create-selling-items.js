'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Selling_Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.DOUBLE(8,2)
      },
      list_price: {
        type: Sequelize.DOUBLE(8,2)
      },
      selling_price: {
        type: Sequelize.DOUBLE(8,2)
      },
      sub_total: {
        type: Sequelize.DOUBLE(8,2)
      },
      percent_table: {
        type: Sequelize.DOUBLE(8,2)
      },
      fk_product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id"
        }
      },
      fk_storage_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Storages",
          key: "id"
        }
      },
      fk_selling_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sellings",
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
    await queryInterface.dropTable('Selling_Items');
  }
};