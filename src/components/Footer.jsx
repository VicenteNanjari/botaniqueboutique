// src/components/Footer.jsx

import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-4">
      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-md-6 text-center text-md-left">
            <h5>Mi Tienda E-commerce</h5>
            <p>Eslogan</p>
          </div>
          <div className="col-md-6 text-center text-md-right">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>Email: contacto@mitienda.com</li>
              <li>Teléfono: 123-456-7890</li>
              <li>Otras formas de contacto</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center text-md-right">
            <p>&copy; {new Date().getFullYear()} Mi Tienda E-commerce - Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
