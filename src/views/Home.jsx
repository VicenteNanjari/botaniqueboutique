import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
 return (
    <Container fluid>
      <Row>
        <Col md={12}>    
          <h1>Bienvenido a Botanique</h1>
          <p className='bienvenida'>
          "¡Bienvenido a Botanique Boutique, tu oasis verde en línea! En nuestro jardín virtual, 
           cultivamos más que solo plantas; creemos en sembrar la alegría y la serenidad en cada rincón de tu vida. 
            Explora nuestra exquisita selección de plantas cuidadosamente elegidas, desde elegantes 
          suculentas hasta exuberantes helechos. En Botanique Boutique, no solo vendemos plantas, ofrecemos 
           la posibilidad de transformar tu espacio en un santuario natural. Descubre la magia de la naturaleza 
            y da vida a tu hogar con nosotros. ¡Bienvenido a un mundo donde cada planta cuenta su 
            propia historia de belleza y bienestar!"
          </p>
        </Col>
      </Row>
    </Container>
 );
};

export default Home;