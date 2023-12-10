// src/components/Footer.jsx
import "../css/footer.css";

function Footer() {
  return (
    <footer className="text-white mt-4" style={{ backgroundColor: '#6b705c' }}>
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6 text-center text-md-left">
            <h5>Botanique Boutique</h5>
            <p>Sembrando la alegría y la serenidad en cada rincón de tu vida.</p>
          </div>
          <div className="col-md-6 text-center text-md-right">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>Email: contacto@botanique.com</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p>&copy; {new Date().getFullYear()} Botanique Boutique E-commerce - Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
