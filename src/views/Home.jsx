import React from 'react';
import '../css/home.css';
import PlantCareInfo from '../components/PlantCareInfo';
import ProductShowcase from '../components/ProductShowcase';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="welcome-section">
        <h1>Bienvenido a Botanique Boutique</h1>
        <p>¡Bienvenido a Botanique Boutique, tu oasis verde en línea! En nuestro jardín virtual, cultivamos más que solo plantas; creemos en sembrar la alegría y la serenidad en cada rincón de tu vida. Explora nuestra exquisita selección de plantas cuidadosamente elegidas, desde elegantes suculentas hasta exuberantes helechos. En Botanique Boutique, no solo vendemos plantas, ofrecemos la posibilidad de transformar tu espacio en un santuario natural. Descubre la magia de la naturaleza y da vida a tu hogar con nosotros. ¡Bienvenido a un mundo donde cada planta cuenta su propia historia de belleza y bienestar!</p>
      </header>
      <ProductShowcase />
      <PlantCareInfo />
      <div className='footer-spacing'></div>
    </div>
  );
}

export default HomePage;