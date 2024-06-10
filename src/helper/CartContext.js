import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
      // Initialize quantities for each item in the cart
      const initialQuantities = {};
      storedCart.forEach((item) => {
        initialQuantities[item._id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, []);

  const addToCart = (item) => {
    console.log("Item to be added:", item);
    console.log("Current cart:", cart);
    console.log("Current quantities:", quantities);
  
    const existingItemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);
    if (existingItemIndex !== -1) {
      console.log("Item already exists in cart.");
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      console.log("Updated cart:", updatedCart);
      setCart(updatedCart);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item._id]: (prevQuantities[item._id] || 0) + item.quantity,
      }));
    } else {
      console.log("Item does not exist in cart. Adding new item.");
      setCart([...cart, item]);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item._id]: item.quantity,
      }));
    }
  };
  
  

  const removeFromCart = (productId) => {
    // const updatedCart = cart.filter((item) => item._id !== productId);
    // const updatedQuantities = { ...quantities };
    // delete updatedQuantities[productId];
    // setCart(updatedCart);
    // setQuantities(updatedQuantities);
      setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, quantities, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
