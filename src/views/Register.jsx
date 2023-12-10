import React, { useState } from 'react';
import axios from 'axios';
import '../css/registro.css';

const Registro = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleRegistro = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/usuarios/registro', {
                username,
                password,
                email
            });

            if (response.data.token) {
                // Almacenar el JWT en localStorage o en la memoria de la aplicación
                localStorage.setItem('token', response.data.token);
                alert('Registro exitoso!');
                // Redirigir al usuario o realizar otra acción
            }
        } catch (err) {
            if (err.response) {
                // El servidor respondió con un estado fuera del rango 2xx
                setError(err.response.data.mensaje);
            } else {
                setError('Error al realizar el registro');
            }
        }
    };

    return (
    <div className="registro-container">
      <h2>Registro de Usuario</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegistro}>
          <input 
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <input 
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Registrarse</button>
      </form>
  </div>
    );
};

export default Registro;
