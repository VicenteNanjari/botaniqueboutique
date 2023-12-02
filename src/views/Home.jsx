import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
 return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <h1>Bienvenido a Botanique</h1>
          <p>
            Encontrarás todo tipo de planta, decoración hogar, aroma terapia y huerto culti.
          </p>
        </Col>
      </Row>
    </Container>
 );
};

export default Home;