'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Profiles', [{
      userId: 1,
      firstName: 'Administrator',
      lastName: 'Residencia Privada Las Alamedas',
      avatar: null
    }], {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
