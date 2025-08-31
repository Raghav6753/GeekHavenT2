import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log("CartContext.addToCart called:", product);
    setCartItems((prev) => {
      const key = product._id || product.id || null;
      const newItem = { ...product, quantity: 1 };
      if (!newItem.image) {
        if (Array.isArray(product.images) && product.images.length > 0) {
          newItem.image = product.images[0];
        } else if (product.image) {
          newItem.image = product.image;
        } else {
          newItem.image = "/placeholder.svg";
        }
      }
      if (key) {
        newItem._id = product._id || product.id;
        newItem.id = product.id || product._id;
      }
      const existing = prev.find((item) => (item._id || item.id) === (key));
      if (existing) {
        return prev.map((item) =>
          (item._id || item.id) === key
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        return [...prev, newItem];
      }
    });
  };

  useEffect(() => {
    console.log("CartContext.cartItems changed:", cartItems);
  }, [cartItems]);

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId && item._id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    setCartItems((prev) => {
      if (qty <= 0) {
        return prev.filter((item) => item.id !== productId && item._id !== productId);
      }
      return prev.map((item) => {
        if ((item._id || item.id) === productId) {
          return { ...item, quantity: qty };
        }
        return item;
      });
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
