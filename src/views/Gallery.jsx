//Aquí va la vista de la Galería
import React, { useState, useEffect } from 'react';
import "../css/gallery.css";
import axios from 'axios';
import moneyFormater from '../utils/moneyFormater.js';
import { Link } from 'react-router-dom';

const GaleriaProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4 title">Galería de Productos</h2>
            <div className="row">
                {productos.map((producto) => (
                    <div key={producto.id} className="col-md-4 mb-4">
                        <Link to={`/producto/${producto.id}`} className="text-decoration-none text-dark">
                            <div className="card h-100 shadow">
                                <img src={producto.imagen} alt={producto.nombre} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{producto.nombre}</h5>
                                    <p className="card-text">{producto.descripcion}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-muted">Precio: ${moneyFormater(producto.precio)}</span>
                                        <span className={(producto.stock > 0) ? "text-success" : "text-danger"}>
                                            Stock: {producto.stock > 0 ? 'Disponible' : 'Agotado'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GaleriaProductos;