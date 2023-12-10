//Este es el perfil de usuario.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PerfilUsuario = () => {
    const navigate = useNavigate(); // Inicializar useNavigate
    const { userId } = useParams();
    const [perfil, setPerfil] = useState(null);
    const [error, setError] = useState('');

    const handleSubirProducto = () => {
        navigate('/subir-producto'); // Asegúrate de tener esta ruta en tu router
    };

    const handleEditarPerfil = () => {
        navigate(`/editar-perfil/${userId}`); // Asegúrate de tener esta ruta en tu router
    };

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token JWT almacenado
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}` // Incluir el token en las cabeceras
                    }

                };
                const response = await axios.get(`http://localhost:3000/usuarios/${userId}`, config);
                setPerfil(response.data);
            } catch (error) {
                setError('Error al obtener la información del perfil');
                console.error(error);
            }
        };

        fetchPerfil();
    }, [userId]);

    if (error) {
        return <div className="alert alert-danger" role="alert">Error: {error}</div>;
    }

    if (!perfil) {
        return <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only">Cargando...</span></div></div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img src="https://via.placeholder.com/150" className="img-fluid rounded-circle mb-3" alt="Imagen de perfil" />
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Perfil de Usuario</h2>
                            <p className="card-text"><strong>Nombre de usuario:</strong> {perfil.nombre}</p>
                            <p className="card-text"><strong>Email:</strong> {perfil.email}</p>
                            <button onClick={handleSubirProducto} className="btn btn-primary ">Subir Producto</button>
                            <button onClick={handleEditarPerfil} className="btn btn-secondary m-3">Editar Perfil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilUsuario;
