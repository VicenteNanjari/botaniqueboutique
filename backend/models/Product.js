// models/Product.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    // Define los atributos del modelo
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2), // Ajusta la precisión según tus necesidades
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true // Depende si quieres que todos los productos tengan imagen
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 // Puede ser útil tener un valor predeterminado
    },
    // Agrega otros campos que consideres necesarios
});

module.exports = Product;
