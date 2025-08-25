'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Report, { foreignKey: "user_id", as: "reports" });
    }
  }
  User.init({
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.ENUM("admin", "user"), allowNull: true, defaultValue: "user" }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};