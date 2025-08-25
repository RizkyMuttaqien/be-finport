'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING, allowNull: true
      },
      income: {
        type: Sequelize.DOUBLE, allowNull: true, defaultValue: 0
      },
      expense: {
        type: Sequelize.DOUBLE, allowNull: true, defaultValue: 0
      },
      balance: {
        type: Sequelize.DOUBLE, allowNull: true, defaultValue: 0
      },
      report_date: {
        type: Sequelize.DATE, allowNull: true
      },
      user_id: {
        type: Sequelize.INTEGER, allowNull: true
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reports');
  }
};
