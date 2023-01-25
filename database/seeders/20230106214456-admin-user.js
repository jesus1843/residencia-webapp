'use strict';
const crypto = require('crypto');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.pbkdf2Sync('QyV76FEG5G*', salt, 1000, 64, 'sha512').toString('hex');

    return queryInterface.bulkInsert('Users', [{
      email: 'jjesus1843vg@gmail.com',
      password: passwordHash,
      salt,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
