'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Config', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Config', null, {});
  }
};
