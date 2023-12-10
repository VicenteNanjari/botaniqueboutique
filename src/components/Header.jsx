import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';
import logo from '../img/logo-botanique-boutique.jpg';
import { useCart } from '../utils/CartContext';

const Header = () => {
  const userId = localStorage.getItem('id');
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const cartItemCount = cartItems.reduce((total, item) => total + item.cantidad, 0);

  const handleProfileClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/usuarios/${userId}`);
    } else {
      navigate('/login');
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="header">
      <Navbar.Brand href="/">
        <img src={logo} alt="Botanique Boutique" className='logo' />
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"> {/* Ajustado para alinear al centro */}
          <LinkContainer to="/gallery">
            <Nav.Link>Galería</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/registro">
            <Nav.Link>Registro</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav className="ml-auto right-nav-icons">
          <NavItem>
            <LinkContainer to="/carrito">
              <Nav.Link>
                <FaShoppingCart />
                Carrito
                {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
              </Nav.Link>
            </LinkContainer>
          </NavItem>
          <NavItem>
            <Nav.Link onClick={handleProfileClick}>
              <FaUser />
              Mi perfil
            </Nav.Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
