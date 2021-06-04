'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
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
      ean: {
        type: Sequelize.STRING(13)
      },
      fractioned_qty: {
        type: Sequelize.DOUBLE(8, 2)
      },
      unit_price: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
      },
      buy_price: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
      },
      cost_price: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
      },
      selling_price: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
      },
      profit: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
      },
      ipi: {
        type: Sequelize.STRING
      },
      icms: {
        type: Sequelize.STRING
      },
      ncm: {
        type: Sequelize.STRING
      },
      csosn: {
        type: Sequelize.STRING
      },
      fk_supplier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Suppliers",
          key: 'id'
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
    await queryInterface.dropTable('Products');
  }
};