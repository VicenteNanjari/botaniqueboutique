//Aquí va la vista de la Galería
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            <h2>Galería de Productos</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {productos.map((producto) => (
                    <div key={producto.id} style={{ margin: '10px' }}>
                        <h3>{producto.nombre}</h3>
                        <p>{producto.descripcion}</p>
                        <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        <p>Precio: ${producto.precio}</p>
                        <p>Stock: {producto.stock}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GaleriaProductos;
/*
https://ibb.co/WNhKHwm
https://ibb.co/88Nzx3z
https://ibb.co/vQq6KMk
https://ibb.co/k88Y7ZL
https://ibb.co/vd4rx9Y
https://ibb.co/2yMLrsx
https://ibb.co/H2m0MnQ
https://ibb.co/yS4XLHv
https://ibb.co/SQQLZbM
https://ibb.co/YXHLdzF
https://ibb.co/1Lb7zyy
https://ibb.co/0CmDFGj
https://ibb.co/jLVYfzJ
https://ibb.co/sm2styd
https://ibb.co/NNJyLjh
https://ibb.co/dGz1ZsB
https://ibb.co/ZKHWPJ8
https://ibb.co/x1WGpbs
https://ibb.co/w6QTNpz

<a href="https://ibb.co/w6QTNpz"><img src="https://i.ibb.co/4NScZ4V/Ficus-Lyrata.png" alt="Ficus-Lyrata" border="0" /></a>
<a href="https://ibb.co/WNhKHwm"><img src="https://i.ibb.co/XfQJWgc/Zamioculcas.png" alt="Zamioculcas" border="0" /></a>
<a href="https://ibb.co/88Nzx3z"><img src="https://i.ibb.co/ryFbpPb/Cactus-Cola-de-Mono.png" alt="Cactus-Cola-de-Mono" border="0" /></a>
<a href="https://ibb.co/vQq6KMk"><img src="https://i.ibb.co/qWj3P2p/Begonia-Maculata.png" alt="Begonia-Maculata" border="0" /></a>
<a href="https://ibb.co/k88Y7ZL"><img src="https://i.ibb.co/R00LF8X/Planta-de-Jade.png" alt="Planta-de-Jade" border="0" /></a>
<a href="https://ibb.co/vd4rx9Y"><img src="https://i.ibb.co/QHvqF0d/Planta-Serpiente.png" alt="Planta-Serpiente" border="0" /></a>
<a href="https://ibb.co/2yMLrsx"><img src="https://i.ibb.co/s21D46n/Rosa-Miniatura.png" alt="Rosa-Miniatura" border="0" /></a>
<a href="https://ibb.co/H2m0MnQ"><img src="https://i.ibb.co/7z7HT2F/Lavanda.png" alt="Lavanda" border="0" /></a>
<a href="https://ibb.co/yS4XLHv"><img src="https://i.ibb.co/8cY0F1v/Crisantemo.png" alt="Crisantemo" border="0" /></a>
<a href="https://ibb.co/SQQLZbM"><img src="https://i.ibb.co/ZHHZb5F/Poto-Dorado.png" alt="Poto-Dorado" border="0" /></a>
<a href="https://ibb.co/YXHLdzF"><img src="https://i.ibb.co/LrVZgLX/Aloe-Vera.png" alt="Aloe-Vera" border="0" /></a>
<a href="https://ibb.co/1Lb7zyy"><img src="https://i.ibb.co/nbR6Pdd/Dracaena-Marginata.png" alt="Dracaena-Marginata" border="0" /></a>
<a href="https://ibb.co/0CmDFGj"><img src="https://i.ibb.co/jyb6Wrv/Bons-i-Jun-pero.png" alt="Bons-i-Jun-pero" border="0" /></a>
<a href="https://ibb.co/jLVYfzJ"><img src="https://i.ibb.co/Q68VQkD/Orqu-dea-Phalaenopsis.png" alt="Orqu-dea-Phalaenopsis" border="0" /></a>
<a href="https://ibb.co/sm2styd"><img src="https://i.ibb.co/M2sP9Mx/Helecho-Boston.png" alt="Helecho-Boston" border="0" /></a>
<a href="https://ibb.co/NNJyLjh"><img src="https://i.ibb.co/C9YHn7d/Cactus-San-Pedro.png" alt="Cactus-San-Pedro" border="0" /></a>
<a href="https://ibb.co/dGz1ZsB"><img src="https://i.ibb.co/m6M1prJ/Palmera-Areca.png" alt="Palmera-Areca" border="0" /></a>
<a href="https://ibb.co/ZKHWPJ8"><img src="https://i.ibb.co/S0QR8xn/Monstera-Deliciosa.png" alt="Monstera-Deliciosa" border="0" /></a>
<a href="https://ibb.co/x1WGpbs"><img src="https://i.ibb.co/D9hkxFb/Succulenta-Echeveria.png" alt="Succulenta-Echeveria" border="0" /></a>
*/