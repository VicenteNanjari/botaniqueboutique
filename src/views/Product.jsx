import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/product.css';
import moneyFormater from '../utils/moneyFormater.js';
import { useCart } from '../utils/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const { addToCart } = useCart();
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/productos/${id}`);
                setProducto(response.data);
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
            }
        };

        fetchProducto();
    }, [id]);
    
    const handleAddToCart = () => {
      const productToAdd = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen
      };
      addToCart(productToAdd);
    };

    if (!producto) {
        return <div>Cargando...</div>;
    }
  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="product-info">
        <h1 className="product-title">{producto.nombre}</h1>
        <p className="product-description">{producto.descripcion}</p>
        <p className="product-price">${moneyFormater(producto.precio)}</p>
        <p className="product-stock">{producto.stock > 0 ? 'Disponible' : 'Agotado'}</p>
        <div className="product-actions">
        <button className="btn-add-to-cart" onClick={handleAddToCart}>ADD TO CART</button>
        </div>
        
      </div>
      <div className="related-products">
        {/* Componentes o elementos para productos relacionados */}
      </div>
    </div>
  );
};

export default ProductDetail;
