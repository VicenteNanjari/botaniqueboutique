//Aquí va la vista de la Galería

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Gallery = () => {
  const products = [
    { id: 1, name: 'Planta A', price: 20 },
    { id: 2, name: 'Planta B', price: 25 },
    { id: 3, name: 'Planta C', price: 30 },
    // ... más productos
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Galería de Productos</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`https://via.placeholder.com/150?text=${product.name}`} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Precio: ${product.price}</Card.Text>
                {/* Agrega más detalles según tus necesidades */}
                <Button variant="primary">Ver Detalles</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
