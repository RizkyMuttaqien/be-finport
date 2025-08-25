'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      Report.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  Report.init({
    title: DataTypes.STRING,
    income: DataTypes.INTEGER,
    expense: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    report_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Report',
  });

  return Report;
};