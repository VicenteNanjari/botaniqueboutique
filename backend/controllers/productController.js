// controllers/productController.js
const Product = require('../models/Product'); // Importa el modelo

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};

exports.createProduct = async (req, res) => {
    // Lógica para crear un producto
};

// Agrega más métodos según sea necesario
