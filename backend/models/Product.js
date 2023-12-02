// models/Product.js
import { Sequelize, DataTypes, BulkRecordError } from 'sequelize';
import sequelize from '../config/database.js';

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
        type: DataTypes.INTEGER,
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
    }
});



export default Product;
