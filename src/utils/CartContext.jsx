import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Crear el contexto del carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      // Verificar si el artículo ya está en el carrito
      const itemExists = prevItems.find(item => item.id === newItem.id);
      if (itemExists) {
        // Incrementar la cantidad si ya existe
        return prevItems.map(item =>
          item.id === newItem.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      // Agregar el nuevo artículo al carrito
      return [...prevItems, { ...newItem, cantidad: 1, precio: newItem.precio }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      // Encuentra el artículo en el carrito
      const itemInCart = prevItems.find(item => item.id === itemId);
  
      // Si solo hay una cantidad de este artículo, quítalo completamente
      if (itemInCart && itemInCart.cantidad === 1) {
        return prevItems.filter(item => item.id !== itemId);
      }
  
      // Si hay más de uno, disminuye la cantidad
      return prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, cantidad: item.cantidad - 1 };
        }
        return item;
      });
    });
  };
  
  const onCheckOut = async () => {
    // Crear un array con los productos y sus cantidades actualizadas
    const productosParaActualizar = cartItems.map(item => ({
      id: item.id,
      cantidadComprada: item.cantidad
    }));

    try {
      // Realizar la solicitud POST al endpoint de actualización de stock
      const response = await axios.post('http://localhost:3000/productos/actualizar-stock', productosParaActualizar);

      // Manejar la respuesta del servidor
      console.log(response.data.mensaje);
      // Aquí podrías vaciar el carrito o realizar otras acciones necesarias después del checkout
      setCartItems([]);

    } catch (error) {
      // Manejar posibles errores en la solicitud
      console.error('Error al realizar el checkout:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, onCheckOut}}>
      {children}
    </CartContext.Provider>
  );
};
