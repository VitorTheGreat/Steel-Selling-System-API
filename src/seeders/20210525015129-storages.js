'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Storages', [
     {
       name: "KM54",
       local: "Cotia",
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       name: "Residencial Europa",
       local: "Ibiúna",
       createdAt: new Date(),
       updatedAt: new Date(),
     },
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
