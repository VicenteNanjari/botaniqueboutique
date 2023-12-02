// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database').default.default;

const User = sequelize.define('User', {
  // Define los atributos del modelo
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // Agrega otros campos según sea necesario
});

module.exports = User;
