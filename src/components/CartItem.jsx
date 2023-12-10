import React from 'react';
import moneyFormat from '../utils/moneyFormater';

const CartItem = ({ item, onRemoveItem }) => {
  return (
    <div className="carrito-item">
      <img src={item.imagen} alt={item.nombre} className="carrito-item-imagen" />
      <div className="carrito-item-info">
        <h5>{item.nombre}</h5>
        <p>Cantidad: {item.cantidad}</p>
        <p>Precio: ${moneyFormat(item.precio)}</p>
      </div>
      <button onClick={onRemoveItem} className="btn btn-danger">Eliminar</button>
    </div>
  );
};

export default CartItem;
