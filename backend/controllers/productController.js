// controllers/productController.js
import Product from '../models/Product'; // Importa el modelo

export async function getAllProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

export async function createProduct(req, res) {
    // Lógica para crear un producto
}

// Agrega más métodos según sea necesario
