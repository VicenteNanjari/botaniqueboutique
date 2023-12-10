import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubirProducto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState(null);
    const [stock, setStock] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('imagen', imagen);
        formData.append('stock', stock);
        console.log(formData);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/productos', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            navigate('/gallery'); // Redirige a la página que desees después de subir el producto
        } catch (error) {
            console.error('Error al subir el producto:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Subir Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre de planta</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        rows="3"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className='mb-3'>
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        id="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">Imagen</label>
                    <input
                        type="file"
                        className="form-control"
                        id="imagen"
                        onChange={(e) => setImagen(e.target.files[0])}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock Disponible</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Subir Producto</button>
            </form>
        </div>
    );
};

export default SubirProducto;
