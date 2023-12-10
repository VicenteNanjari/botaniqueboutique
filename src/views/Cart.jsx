import React from 'react';
import CartItem from '../components/CartItem.jsx';
import '../css/cart.css';
import { useCart } from '../utils/CartContext';
import moneyFormat from '../utils/moneyFormater';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const CarritoDeCompras = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, onCheckOut } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const onRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    onCheckOut();
    // Luego del checkout, redirige a la página de agradecimiento
    navigate('/thankyoupage');
  };

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemoveItem={() => onRemoveItem(item.id)} />
          ))}
          <div className="carrito-total">
            <strong>Total:</strong> ${moneyFormat(total)}
          </div>
          <button onClick={handleCheckout} className="btn btn-success">Proceder al Pago</button>
        </div>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </div>
  );
};

export default CarritoDeCompras;
