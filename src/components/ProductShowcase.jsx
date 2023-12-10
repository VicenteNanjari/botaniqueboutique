import React, { useState, useEffect } from 'react';
import '../css/product-showcase.css';
const ProductShowcase = () => {
  const [productos, setProductos] = useState([]);
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/productos') // Ajusta esta URL a tu API
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        // Seleccionar 3 productos al azar
        setProductosDestacados(data.sort(() => 0.5 - Math.random()).slice(0, 3));
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <section className="product-showcase">
      {productosDestacados.map((producto) => (
        <div key={producto.id} className="product-card">
          <img src={producto.imagen} alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          {/* Otros detalles del producto */}
        </div>
      ))}
    </section>
  );
};

export default ProductShowcase;
