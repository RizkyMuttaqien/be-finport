'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hash = await bcrypt.hash("admin123", 10);
    return queryInterface.bulkInsert("Users", [{
      email: "admin@finport.com",
      password: hash,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", { email: "admin@finport.com" });
  }
};
